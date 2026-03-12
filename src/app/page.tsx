'use client';

import { useCustomRouter } from "@/hooks";
import { useLogInMutation } from "@/libs/store/api/authApiSlice";
import { Card, TextField, Button } from "@mui/material";

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
    <article className="bg-amber-900">
      <section className="text-center h-screen w-screen flex flex-col items-center justify-center">
        <label htmlFor="login-card" className="text-4xl font-bold">Login Kribi</label>
        <Card id="login-card" className="w-1/4 h-1/2 mt-12">
          <form method="post" className="flex flex-col h-full justify-center gap-2 p-2 bg-amber-500 " onSubmit={handleOnSubmit}>
            <TextField
              label="Email"
              type="email"
              name="username"
              required
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              required
            />
            <Button type="submit" variant="contained" color="primary">Login</Button>
          </form>
        </Card>
      </section>
    </article>
  );
}
