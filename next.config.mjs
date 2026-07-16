import fs from "node:fs";
import path from "node:path";

const legacyHtmlDir = path.join(process.cwd(), "legacy-html");

function getLegacyRedirects() {
  if (!fs.existsSync(legacyHtmlDir)) {
    return [];
  }

  const htmlFiles = fs
    .readdirSync(legacyHtmlDir)
    .filter((file) => file.endsWith(".html"));

  const pageRedirects = htmlFiles.map((file) => {
    if (file === "index.html" || file === "Home.html") {
      return {
        source: `/${file}`,
        destination: "/",
        permanent: true
      };
    }

    const slug = file.replace(/\.html$/i, "");

    return {
      source: `/${file}`,
      destination: `/${slug}`,
      permanent: true
    };
  });

  return [
    {
      source: "/Home",
      destination: "/",
      permanent: true
    },
    {
      source: "/index",
      destination: "/",
      permanent: true
    },
    ...pageRedirects
  ];
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return getLegacyRedirects();
  }
};

export default nextConfig;
