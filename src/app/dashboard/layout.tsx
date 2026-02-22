'use client';

import { useEffect } from "react";
import { useRequest } from "@/api";
import { logOut, checkAuth } from "@/api";
import { useCustomRouter } from "@/utils";
import { AuthResponse } from "@/models";
import { useAppSelector, useAppDispatch } from "@/libs/store";
import { setMe, clearMe } from "@/libs/store/slices";

export default function GeneralLayout({ children }: { children: React.ReactNode }) {
  const { goLogin } = useCustomRouter();
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.me);

  const { request: logOutRequest, response: logOutResponse } = useRequest(logOut);
  const { request: checkAuthRequest, response: checkAuthResponse, isError: isAuthError } = useRequest<AuthResponse>(checkAuth);

  useEffect(() => {
    if (logOutResponse || isAuthError) {
      dispatch(clearMe());
      goLogin();
    }
  }, [isAuthError, logOutResponse, goLogin, dispatch]);

  // Only call /me if Redux state is empty (e.g. page refresh)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!me.fullName) {
      checkAuthRequest();
    }
  }, []);

  // Sync API response back into Redux store
  useEffect(() => {
    if (checkAuthResponse) {
      dispatch(setMe(checkAuthResponse));
    }
  }, [checkAuthResponse, dispatch]);

  function handleLogOut() {
    logOutRequest();
  }

  // TODO: improve the layout and header design
  return (
    <div>
      <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
        {
          me.fullName && <h1>Welcome, {me.fullName}</h1>
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
