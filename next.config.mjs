/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['fastly.picsum.photos'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'red-mad-woodpecker-146.mypinata.cloud',
                port: '',
                pathname: '/ipfs/**',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
                pathname: '/*',
            },
        ],

    }
};

export default nextConfig;
