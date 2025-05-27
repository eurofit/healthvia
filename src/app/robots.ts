import { publicUrl } from '@/env.mjs';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api', '/admin', '/private'],
        },
        sitemap: `${publicUrl}/sitemap.xml`,
        host: publicUrl,
    };
}
