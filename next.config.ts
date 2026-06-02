import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // nodemailer uses dynamic requires; keep it external so it isn't bundled.
  serverExternalPackages: ["nodemailer"],
  images: {
    remotePatterns: [
      // Supabase Storage public URLs (vehicle photos)
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
