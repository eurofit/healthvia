'use client';

import { Button } from '@/components/ui/button';
import React from 'react';

type ReloadButtonProps = React.ComponentProps<typeof Button>;

export function ReloadButton({ children, className, ...props }: ReloadButtonProps) {
  const handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };
  return (
    <Button
      className={className}
      variant="outline"
      size="lg"
      onClick={handleReload}
      {...props}
    >
      {children}
    </Button>
  );
}
