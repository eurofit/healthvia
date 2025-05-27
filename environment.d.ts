declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_APP_URL: string;
            NODE_ENV: 'development' | 'production' | 'test';
        }
    }
}

// This is a workaround to ensure that the environment variables are available globally
export {};
