'use client';

import { useCustomRouter } from "@/hooks";
import { useLogInMutation } from "@/libs/store/api/authApiSlice";

export default function LogIn() {
  const { goHome } = useCustomRouter();
  const [logIn] = useLogInMutation();

  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await logIn(formData).unwrap();
      goHome();
    } catch (err) {
      console.error('Login failed', err);
    }
  }

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
