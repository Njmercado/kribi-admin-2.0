'use client';

import { useEffect, useState } from "react";
import { useCustomRouter } from "@/hooks";
import { useAppSelector, useAppDispatch } from "@/libs/store";
import { setMe, clearMe } from "@/libs/store/slices";
import { Topbar, Sidebar } from "@/components/molecule";
import { useCheckAuthQuery, useLogOutMutation } from "@/libs/store/api/authApiSlice";

export default function GeneralLayout({ children }: { children: React.ReactNode }) {
  const { goLogin } = useCustomRouter();
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.me);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [logOut] = useLogOutMutation();
  // Using RTK Query, we can just call it unconditionally; 
  // skip: true prevents it from firing if we already have the user in Redux.
  const { data: authResponse, isError: isAuthError } = useCheckAuthQuery(undefined, {
    skip: !!me.fullName
  });

  // Sync API response back into Redux store
  useEffect(() => {
    if (isAuthError && !authResponse) {
      goLogin();
    }

    if (authResponse) {
      dispatch(setMe(authResponse));
    }
  }, [authResponse, dispatch, isAuthError, goLogin]);

  async function handleLogOut() {
    try {
      await logOut().unwrap();
      dispatch(clearMe());
      goLogin();
    } catch (error) {
      console.error('Logout failed', error);
      dispatch(clearMe());
      goLogin();
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex flex-col flex-1 w-full relative">
        <Topbar
          userName={me.fullName}
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
