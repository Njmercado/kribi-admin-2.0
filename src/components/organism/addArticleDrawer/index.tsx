'use client';

import { useState } from "react";
import { Drawer } from '@/components/atom/drawer';
import { Button } from '@/components/atom';
import { IArticle } from "@/models";
import { DrawerDirection } from '@/components/atom/drawer';
import { ArticleForm } from "@/components/molecule";

export interface AddArticleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (form: IArticle) => void;
  direction?: DrawerDirection;
}

export function AddArticleDrawer({
  isOpen,
  onClose,
  onSubmit,
  direction = DrawerDirection.RIGHT_TO_LEFT
}: AddArticleDrawerProps) {

  const [article, setArticle] = useState<IArticle>({
    title: '',
    content: '',
    tags: [],
    summary: '',
    published: false,
    cover: null,
  });

  const disableSubmit = article.title.trim() === '' || article.content.trim() === '';

  function handleOnSubmit() {
    onSubmit?.(article);
  }

  function handleOnClose() {
    setArticle({
      title: '',
      content: '',
      tags: [],
      summary: '',
      published: false,
      cover: null,
    })
    onClose();
  }

  return (
    <Drawer
      direction={direction}
      isOpen={isOpen}
      onClose={handleOnClose}
    >
      <article className="drawer-content flex flex-col h-full bg-surface overflow-y-scroll max-h-screen py-4">
        <section className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold tracking-wide">Write Article</h2>
        </section>
        <ArticleForm article={article} onChange={setArticle} />

        <section className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-2">
          <Button
            variant="text"
            color="secondary"
            onClick={handleOnClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOnSubmit}
            disabled={disableSubmit}
          >
            Submit
          </Button>
        </section>
      </article>
    </Drawer>
  );
}
