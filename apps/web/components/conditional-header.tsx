'use client';

import { usePathname } from 'next/navigation';
import { GlobalHeader } from './global-header';

export function ConditionalHeader() {
  const pathname = usePathname();
  
  // Don't show header on landing page and auth pages
  if (pathname === '/' || pathname?.startsWith('/auth')) {
    return null;
  }
  
  return <GlobalHeader />;
}
