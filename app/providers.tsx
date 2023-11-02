'use client';
import { ReduxProvider } from '@/redux/provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
