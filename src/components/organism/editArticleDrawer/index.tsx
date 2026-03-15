'use client';

import { useState, useEffect } from "react";
import { Drawer, DrawerSize } from '@/components/atom/drawer';
import { Button, TextField } from '@/components/atom';
import { ArticleDTO } from "@/models";
import { DrawerDirection } from '@/components/atom/drawer';
import { ArticleForm } from "@/components/molecule";

export interface EditArticleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (article: ArticleDTO) => void;
  onDelete?: (id: string) => void;
  article?: ArticleDTO | null;
  direction?: DrawerDirection;
}

export function EditArticleDrawer({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  article,
  direction = DrawerDirection.RIGHT_TO_LEFT
}: EditArticleDrawerProps) {

  const [form, setForm] = useState<ArticleDTO>({
    title: '',
    content: '',
    tags: [],
    summary: '',
    published: false,
    cover: null,
    id: '',
    createdAt: '',
    updatedAt: '',
  });

  useEffect(() => {
    if (article) {
      setForm(article);
    }
  }, [article]);

  // Check if form changed
  const hasChanged = () => {
    if (!form || !article) return false;

    // Simple deep compare for tags array
    const tagsChanged = JSON.stringify(form.tags) !== JSON.stringify(article.tags);

    return (
      form.title !== article.title ||
      form.content !== article.content ||
      form.published !== article.published ||
      form.summary !== article.summary ||
      tagsChanged
    );
  };

  const disableSubmit = !form || form.title.trim() === '' || form.content?.trim() === '' || !hasChanged();

  function handleOnSubmit() {
    if (form) {
      onSubmit?.(form);
    }
  }

  function handleOnDelete() {
    if (form && form.id) {
      const confirmed = window.confirm("Are you sure you want to delete this article?");
      if (confirmed) {
        onDelete?.(form.id);
      }
    }
  }

  if (!form) return null;

  return (
    <Drawer
      direction={direction}
      isOpen={isOpen}
      onClose={onClose}
      size={DrawerSize.LARGE}
    >
      <article className="drawer-content flex flex-col bg-surface overflow-y-scroll max-h-screen p-4">
        <section className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold tracking-wide">Edit Article</h2>
        </section>
        <ArticleForm article={form} onChange={(article) => setForm(article as ArticleDTO)} />

        <section className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between gap-2">
          <Button
            variant="contained"
            color="error"
            onClick={handleOnDelete}
          >
            Delete
          </Button>
          <div className="flex gap-2">
            <Button
              variant="text"
              color="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOnSubmit}
              disabled={disableSubmit}
            >
              Save
            </Button>
          </div>
        </section>
      </article>
    </Drawer>
  );
}
