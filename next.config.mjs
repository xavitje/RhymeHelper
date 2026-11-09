/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Twee root layouts (Engels en /nl, elk met de juiste <html lang>), dus één 404 voor onbekende adressen
  experimental: { globalNotFound: true },
};

export default nextConfig;
