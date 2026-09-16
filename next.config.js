/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    optimizeFonts: false,
    images: {
        unoptimized: true,
    },
    async redirects() {
        return [
            {
                source: "/events",
                destination: "/event",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
