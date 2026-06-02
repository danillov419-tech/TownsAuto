import "server-only";

import nodemailer from "nodemailer";
import { siteConfig } from "./site-config";

/**
 * Admin email notifications over SMTP (e.g. Gmail, your mail host).
 * Configure with env vars:
 *   SMTP_HOST    – e.g. smtp.gmail.com
 *   SMTP_PORT    – 587 (STARTTLS) or 465 (SSL). Default 587.
 *   SMTP_USER    – SMTP username (the full email for Gmail)
 *   SMTP_PASS    – SMTP password / app password
 *   SMTP_SECURE  – "true" to force SSL (auto-enabled for port 465)
 *   EMAIL_FROM   – From header (defaults to SMTP_USER)
 *   NOTIFY_EMAIL – recipient (defaults to siteConfig.email)
 *
 * If SMTP isn't configured, email is skipped silently so forms still work.
 */
const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT || 587);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const secure = process.env.SMTP_SECURE === "true" || port === 465;
const from = process.env.EMAIL_FROM || (user ? `${siteConfig.name} <${user}>` : "");
const to = process.env.NOTIFY_EMAIL || siteConfig.email;

const smtpConfigured = Boolean(host && user && pass);

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
  if (!smtpConfigured) {
    console.warn("SMTP not configured — admin email skipped.");
    return;
  }
  try {
    const transport = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
    await transport.sendMail({
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
