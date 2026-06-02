import "server-only";

import { Resend } from "resend";
import { siteConfig } from "./site-config";

/**
 * Admin email notifications via Resend.
 * Configure with env vars:
 *   RESEND_API_KEY   – your Resend API key (required to actually send)
 *   EMAIL_FROM       – verified sender, e.g. "Towns Auto <noreply@townsauto.com>"
 *                      (defaults to Resend's test sender during setup)
 *   NOTIFY_EMAIL     – where notifications go (defaults to siteConfig.email)
 *
 * If RESEND_API_KEY is not set, email is skipped silently so forms still work.
 */
const apiKey = process.env.RESEND_API_KEY;
const from = process.env.EMAIL_FROM || "Towns Auto <onboarding@resend.dev>";
const to = process.env.NOTIFY_EMAIL || siteConfig.email;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function table(rows: [string, string | null | undefined][]) {
  const body = rows
    .filter(([, v]) => v != null && v !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#64748b;font-weight:600;white-space:nowrap;vertical-align:top">${escapeHtml(
          k
        )}</td><td style="padding:6px 12px;color:#0f172a">${escapeHtml(
          String(v)
        ).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");
  return `<table style="border-collapse:collapse;width:100%;max-width:560px;font-family:system-ui,sans-serif;font-size:14px">${body}</table>`;
}

async function send(subject: string, html: string, replyTo?: string) {
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — admin email skipped.");
    return;
  }
  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
  } catch (err) {
    console.error("Failed to send admin notification email:", err);
  }
}

const LEAD_LABELS: Record<string, string> = {
  contact: "Contact / Question",
  reserve: "Reservation",
  buy: "Outright Purchase Inquiry",
  finance: "Financing Interest",
  test_drive: "Test Drive Request",
};

export async function notifyLead(lead: {
  type: string;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  vehicle_label: string | null;
}) {
  const label = LEAD_LABELS[lead.type] ?? "Inquiry";
  const subject = `New ${label}${lead.vehicle_label ? ` — ${lead.vehicle_label}` : ""} | ${siteConfig.name}`;
  const html = `
    <div style="font-family:system-ui,sans-serif">
      <h2 style="color:#1d4ed8;margin:0 0 4px">New ${escapeHtml(label)}</h2>
      <p style="color:#64748b;margin:0 0 16px">Submitted on ${siteConfig.name}.</p>
      ${table([
        ["Vehicle", lead.vehicle_label],
        ["Name", lead.name],
        ["Email", lead.email],
        ["Phone", lead.phone],
        ["Details", lead.message],
      ])}
    </div>`;
  await send(subject, html, lead.email || undefined);
}

export async function notifyFinancing(app: {
  full_name: string;
  email: string;
  phone: string;
  employment_status: string;
  annual_income: number | null;
  desired_vehicle: string | null;
  down_payment_budget: number | null;
  notes: string | null;
}) {
  const subject = `New Financing Pre-Qualification — ${app.full_name} | ${siteConfig.name}`;
  const html = `
    <div style="font-family:system-ui,sans-serif">
      <h2 style="color:#1d4ed8;margin:0 0 4px">New Financing Pre-Qualification</h2>
      <p style="color:#64748b;margin:0 0 16px">Submitted on ${siteConfig.name}.</p>
      ${table([
        ["Name", app.full_name],
        ["Email", app.email],
        ["Phone", app.phone],
        ["Employment", app.employment_status],
        ["Annual income", app.annual_income != null ? `$${app.annual_income.toLocaleString()}` : null],
        ["Vehicle of interest", app.desired_vehicle],
        ["Down payment budget", app.down_payment_budget != null ? `$${app.down_payment_budget.toLocaleString()}` : null],
        ["Notes", app.notes],
      ])}
    </div>`;
  await send(subject, html, app.email || undefined);
}
