/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    optimizeFonts: false,
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
