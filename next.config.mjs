/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    reactStrictMode: true,
    swcMinify: true,
    output: 'export',
  }; // <--- Added a comma after 'export'
  export default nextConfig;
  