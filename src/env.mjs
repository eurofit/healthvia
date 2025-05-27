// @ts-check

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    GMAIL_PASSWORD: z.string().min(1),
    GMAIL: z.string().email(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GMAIL: process.env.GMAIL,
  },
});

const vercelHost =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    : process.env.NEXT_PUBLIC_VERCEL_URL;
const vercelUrl = vercelHost ? `https://${vercelHost}` : undefined;
const publicUrl = process.env.NEXT_PUBLIC_APP_URL || vercelUrl;

if (!publicUrl) {
  throw new Error('Missing NEXT_PUBLIC_APP_URL or NEXT_PUBLIC_VERCEL_URL variables!');
}

// force type inference to string
const _publicUrl = publicUrl;
export { _publicUrl as publicUrl };
