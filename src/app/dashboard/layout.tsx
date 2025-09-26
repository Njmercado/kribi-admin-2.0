'use client';

import { useEffect } from "react";
import { useRequest } from "@/api";
import { logOut, checkAuth } from "@/api";
import { useCustomRouter } from "@/utils";
import { AuthResponse } from "@/models";

export default function GeneralLayout({ children }: { children: React.ReactNode }) {
  const { goLogin } = useCustomRouter();
  const { request: logOutRequest, response: logOutResponse } = useRequest(logOut);
  const { request: checkAuthRequest, response: checkAuthResponse, isError: isAuthError } = useRequest<AuthResponse>(checkAuth);

  useEffect(() => {
    if (logOutResponse || isAuthError) {
      goLogin();
    }
  }, [isAuthError, logOutResponse, goLogin]);

  useEffect(() => {
    checkAuthRequest();
  }, []);

  function handleLogOut() {
    logOutRequest();
  }

  // TODO: improve the layout and header design
  return (
    <div>
      <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
        {
          checkAuthResponse && <h1>Welcome, {checkAuthResponse.full_name}</h1>
        }
        <button
          onClick={handleLogOut}
          className="bg-red-500 rounded-md p-2 text-white font-bold"
        >
          Logout
        </button>
      </header>
      <main className="p-4">
        {children}
      </main>
    </div>
  );
}
