'use client';

import { useState } from "react";
import { Drawer } from '@/components/atom/drawer';
import { Button, TextField } from '@/components/atom';
import { IArticle } from "@/models";
import { DrawerDirection } from '@/components/atom/drawer';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

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
    published: false,
  });

  const [tagsInput, setTagsInput] = useState('');

  const disableSubmit = article.title.trim() === '' || article.content.trim() === '';

  function handleOnSubmit() {
    onSubmit?.(article);
  }

  return (
    <Drawer
      direction={direction}
      isOpen={isOpen}
      onClose={onClose}
    >
      <article className="drawer-content flex flex-col h-full bg-surface">
        <section className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold tracking-wide">Write Article</h2>
        </section>
        <section className="flex-1 overflow-y-auto p-6 space-y-6">
          <TextField
            label="Title"
            fullWidth
            value={article.title}
            onChange={(e) => setArticle({ ...article, title: e.target.value })}
          />

          <div className="flex flex-col space-y-2">
            <label className="text-sm transition-all duration-200 text-text-secondary">Tags (comma separated)</label>
            <TextField
              label="e.g. news, culture, updates"
              fullWidth
              value={tagsInput}
              onChange={(e) => {
                setTagsInput(e.target.value);
                setArticle({ ...article, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t !== '') });
              }}
            />
          </div>

          <div className="flex flex-col flex-1 h-96 w-full space-y-2 mt-4" data-color-mode="light">
            <label className="text-sm transition-all duration-200 text-text-secondary">Content</label>
            <MDEditor
              value={article.content}
              onChange={(val) => setArticle({ ...article, content: val || '' })}
              height={400}
              className="w-full h-full"
            />
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              id="published"
              checked={article.published}
              onChange={(e) => setArticle({ ...article, published: e.target.checked })}
              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="published" className="text-text-primary">Publish immediately</label>
          </div>
        </section>

        <section className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-2">
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
            Submit
          </Button>
        </section>
      </article>
    </Drawer>
  );
}
