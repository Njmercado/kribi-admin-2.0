'use client';
import { useEffect } from "react";
import { useHaveAccess } from "@/hooks";
import { useCustomRouter } from "@/hooks";
import { Action, ActionType } from "@/contants";

export default function Article() {
  const { haveAccess } = useHaveAccess(Action.ACCESS_ARTICLE as ActionType);
  const { goHome } = useCustomRouter();

  useEffect(() => {
    if (!haveAccess()) {
      goHome();
    }
  }, [haveAccess, goHome]);

  return (
    <main>
      <article>
        <h1>Article Page</h1>
        <p>This is the article page content.</p>
      </article>
    </main>
  )
}