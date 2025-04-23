/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  output: "export",
  distDir: "dist",
};

export default nextConfig;
