'use client';

import { useRouter } from "next/navigation";

export default function LogIn() {

  const router = useRouter();

  function goTo(url: string) { router.push(url); }

  function goToLogin() { goTo('/home'); }

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    console.log(username, password);

    // TODO: Implement login logic
    if(true) { goToLogin(); }
  }

  return (
    <article>
      <section className="text-center">
        <form method="post" className="flex flex-col gap-2 p-2" onSubmit={handleOnSubmit}>
          <input type="text" name="username" placeholder="User Name" className="rounded-md border-solid border-black border-2"/>
          <input type="text" name="password" placeholder="Password" className="rounded-md border-solid border-black border-2"/>
          <button formAction='submit' className="rounded-md bg-blue-400 p-2 text-white font-bold">Login</button>
        </form>
      </section>
    </article>
  );
}
