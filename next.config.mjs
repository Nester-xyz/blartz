/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'red-mad-woodpecker-146.mypinata.cloud',
                port: '',
                pathname: '/ipfs/**',
            },
        ],
    }
};

export default nextConfig;
