/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow specific domains for remote images
    domains: ['lh3.googleusercontent.com'],
    // Allow remote patterns for specific protocols, hostnames, or paths
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Cloudinary images
      },
    ],
  },
};

export default nextConfig;
