import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getVehicles } from "@/lib/vehicles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const staticRoutes = ["", "/inventory", "/financing", "/reviews", "/about", "/contact", "/payment"];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "daily",
    priority: path === "" ? 1 : 0.8,
  }));

  let vehicleEntries: MetadataRoute.Sitemap = [];
  try {
    const vehicles = await getVehicles();
    vehicleEntries = vehicles.map((v) => ({
      url: `${base}/inventory/${v.slug}`,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    // ignore — sitemap should not crash the build
  }

  return [...staticEntries, ...vehicleEntries];
}
