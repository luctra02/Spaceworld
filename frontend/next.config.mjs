/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "images.igdb.com",
            "lh3.googleusercontent.com",
            "cdn.discordapp.com",
        ],
    },
    output: "standalone",
};

export default nextConfig;
