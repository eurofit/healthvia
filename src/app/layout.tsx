import { site } from '@/const/site';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    applicationName: site.name,
    title: site.name,
    description: site.description,

    // openGraph: {
    //     title: site.name,
    //     description: site.description,
    //     url: site.url,
    //     siteName: site.name,
    //     images: [
    //         {
    //             url: `${site.url}/og-image.png`,
    //             width: 1200,
    //             height: 630,
    //             alt: site.name,
    //             type: 'image/png',
    //         },
    //         {
    //             url: `${site.url}/og-image.jpg`,
    //             width: 1200,
    //             height: 630,
    //             alt: site.name,
    //             type: 'image/jpeg',
    //         },
    //     ],
    //     locale: 'en_US',
    //     type: 'website',
    // },
    // twitter: {
    //     card: 'summary_large_image',
    //     title: site.name,
    //     description: site.description,
    //     images: [`${site.url}/og-image.png`],
    //     site: '@your_twitter_handle',
    //     creator: '@your_twitter_handle',
    // },
    icons: {
        apple: [
            { url: '/apple-touch-icon.png' },
            { url: '/apple-touch-icon-57x57.png', sizes: '57x57' },
            { url: '/apple-touch-icon-72x72.png', sizes: '72x72' },
            { url: '/apple-touch-icon-76x76.png', sizes: '76x76' },
            { url: '/apple-touch-icon-114x114.png', sizes: '114x114' },
            { url: '/apple-touch-icon-120x120.png', sizes: '120x120' },
            { url: '/apple-touch-icon-144x144.png', sizes: '144x144' },
            { url: '/apple-touch-icon-152x152.png', sizes: '152x152' },
            { url: '/apple-touch-icon-180x180.png', sizes: '180x180' },
        ],
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#4CAF50' },
        { media: '(prefers-color-scheme: dark)', color: '#000000' },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
