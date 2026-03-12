'use client';

import { useEffect, useState } from "react";
import { useCustomRouter } from "@/hooks";
import { Topbar, Sidebar } from "@/components/molecule";
import { useCheckAuthQuery, useLogOutMutation } from "@/libs/store/api/authApiSlice";

export default function GeneralLayout({ children }: { children: React.ReactNode }) {
  const { goLogin } = useCustomRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [logOut] = useLogOutMutation();
  const { data: me, isError: isAuthError } = useCheckAuthQuery();

  useEffect(() => {
    if (isAuthError) {
      goLogin();
    }
  }, [isAuthError, goLogin]);

  async function handleLogOut() {
    try {
      await logOut().unwrap();
      goLogin();
    } catch (error) {
      console.error('Logout failed', error);
      goLogin();
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex flex-col flex-1 w-full relative">
        <Topbar
          userName={me?.full_name ?? null}
          onLogout={handleLogOut}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
