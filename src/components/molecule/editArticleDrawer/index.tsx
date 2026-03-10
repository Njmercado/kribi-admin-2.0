'use client';

import { useState, useEffect } from "react";
import { Drawer, DrawerSize } from '@/components/atom/drawer';
import { Button, TextField } from '@/components/atom';
import { ArticleDTO } from "@/models";
import { DrawerDirection } from '@/components/atom/drawer';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

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

  const [form, setForm] = useState<ArticleDTO | null>(null);
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (article && isOpen) {
      setForm({ ...article });
      setTagsInput(article.tags?.join(', ') || '');
    } else {
      setForm(null);
      setTagsInput('');
    }
  }, [article, isOpen]);

  // Check if form changed
  const hasChanged = () => {
    if (!form || !article) return false;

    // Simple deep compare for tags array
    const tagsChanged = JSON.stringify(form.tags) !== JSON.stringify(article.tags);

    return (
      form.title !== article.title ||
      form.content !== article.content ||
      form.published !== article.published ||
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
      <article className="drawer-content flex flex-col h-full bg-surface">
        <section className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold tracking-wide">Edit Article</h2>
        </section>
        <section className="flex-1 overflow-y-auto p-6 space-y-6">
          <TextField
            label="Title"
            fullWidth
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <div className="flex flex-col space-y-2">
            <label className="text-sm transition-all duration-200 text-text-secondary">Tags (comma separated)</label>
            <TextField
              label="e.g. news, culture, updates"
              fullWidth
              value={tagsInput}
              onChange={(e) => {
                setTagsInput(e.target.value);
                setForm({ ...form, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t !== '') });
              }}
            />
          </div>

          <div className="flex flex-col flex-1 h-96 w-full space-y-2 mt-4" data-color-mode="light">
            <label className="text-sm transition-all duration-200 text-text-secondary">Content</label>
            <MDEditor
              value={form.content}
              onChange={(val) => setForm({ ...form, content: val || '' })}
              height={400}
              className="w-full h-full"
            />
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              id="published"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="published" className="text-text-primary">Publish immediately</label>
          </div>
        </section>

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
