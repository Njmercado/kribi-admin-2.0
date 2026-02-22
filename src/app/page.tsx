'use client';

import { useCustomRouter } from "@/utils";
import { useRequest, logIn, checkAuth } from "@/api";
import { useEffect } from "react";
import { useAppDispatch } from "@/libs/store";
import { setMe } from "@/libs/store/slices";

export default function LogIn() {
  const { goHome } = useCustomRouter();
  const dispatch = useAppDispatch();
  const { request: login, isError: isLoginError } = useRequest(logIn);
  const { request: checkAuthentication, response: authResponse } = useRequest(checkAuth);

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    login(formData);
    checkAuthentication();
  }

  useEffect(() => {
    if (!isLoginError && authResponse) {
      dispatch(setMe(authResponse));
      goHome();
    }
  }, [authResponse, goHome, isLoginError, dispatch]);

  return (
    <article>
      <section className="text-center">
        <form method="post" className="flex flex-col gap-2 p-2" onSubmit={handleOnSubmit}>
          <input type="text" name="username" placeholder="Email" className="rounded-md border-solid border-black border-2" />
          <input type="password" name="password" placeholder="Password" className="rounded-md border-solid border-black border-2" />
          <button type="submit" className="rounded-md bg-blue-400 p-2 text-white font-bold">Login</button>
        </form>
      </section>
    </article>
  );
}
