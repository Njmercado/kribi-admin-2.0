'use client';

import { useEffect, useState } from "react";
import { useRequest } from "@/api";
import { logOut, checkAuth } from "@/api";
import { useCustomRouter } from "@/hooks";
import { AuthResponse } from "@/models";
import { useAppSelector, useAppDispatch } from "@/libs/store";
import { setMe, clearMe } from "@/libs/store/slices";
import { Topbar, Sidebar } from "@/components/molecule";

export default function GeneralLayout({ children }: { children: React.ReactNode }) {
  const { goLogin } = useCustomRouter();
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.me);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { request: logOutRequest } = useRequest(logOut);
  const { request: checkAuthRequest, response: checkAuthResponse, isError: isAuthError } = useRequest<AuthResponse>(checkAuth);

  // Only call /me if Redux state is empty (e.g. page refresh)
  useEffect(() => {
    if (!me.fullName) {
      checkAuthRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync API response back into Redux store
  useEffect(() => {
    if (isAuthError && !checkAuthResponse) {
      goLogin();
    }

    if (checkAuthResponse) {
      dispatch(setMe(checkAuthResponse));
    }
  }, [checkAuthResponse, dispatch, isAuthError, goLogin]);

  function handleLogOut() {
    logOutRequest();
    dispatch(clearMe());
    goLogin();
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
