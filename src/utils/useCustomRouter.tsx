'use client';

import { useRouter } from "next/navigation";

export default function useCustomRouter(link: string = '/') {
  const router = useRouter();

  return {
    goTo: () => router.push(link),
    goLogin: () => router.push('/'),
    goHome: () => router.push('/dashboard'),
  }
}
