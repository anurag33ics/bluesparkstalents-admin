import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Served under /admin on the website's port (Next.js multi-zones).
  basePath: "/admin",

  async redirects() {
    return [
      {
        // Opening this app's own port at "/" (e.g. http://localhost:3002) lands on the sign-in page.
        // basePath: false matches outside /admin, so the destination has to spell out the prefix.
        // Through the website, "/" belongs to the website and never reaches this app.
        source: "/",
        destination: "/admin/login",
        basePath: false,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
