import { ReloadButton } from '@/components/reload-button';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      <Image
        src="https://www.svgrepo.com/show/426192/cogs-settings.svg"
        alt="Logo"
        className="mb-8 h-40"
        width={160}
        height={160}
      />
      <h1 className="mb-2 text-center text-3xl font-bold">Site is under construction</h1>
      <p className="text-muted-foreground mb-8 max-w-sm text-center text-lg text-pretty">
        We&apos;re working hard to bring you the best user experience. Stay tuned!
      </p>
      <div className="flex space-x-4">
        <Button className="font-medium" size="lg" asChild>
          <Link href="/contact-us">Contact Us</Link>
        </Button>
        <ReloadButton className="font-medium" size="lg">
          Reload Page
        </ReloadButton>
      </div>
    </div>
  );
}
