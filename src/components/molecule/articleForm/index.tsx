'use client';

import { IArticle } from "@/models";
import { TextField } from "@/components/atom";
import { uploadImage } from "@/utils";
import MDEditor from '@uiw/react-md-editor';
import { ArticleDTO } from "@/models";
import { useAlert, AlertType } from "@/hooks";

export interface ArticleFormProps {
  article: IArticle | ArticleDTO;
  onChange: (article: IArticle | ArticleDTO) => void;
}

export function ArticleForm({ article, onChange }: ArticleFormProps) {

  const { openAlert, Toast } = useAlert();

  function handleOnChange(article: IArticle | ArticleDTO) {
    console.log('adding/updating article: ', article);
    onChange(article);
  }

  return (
    <section className="flex-1 overflow-y-auto p-6 space-y-6">

      {article.cover && <img src={article.cover} alt="" />}

      <TextField
        label="Cover"
        fullWidth
        type="file"
        onChange={(e) => {
          const file = e.target.files?.item(0);
          if (file) {
            uploadImage(file).then((data: any) => {
              onChange({ ...article, cover: data.publicUrl });
              openAlert('Image uploaded successfully', AlertType.SUCCESS);
            }).catch((err) => {
              openAlert(err as string, AlertType.ERROR);
            });
          }
        }}
      />

      <TextField
        label="Title"
        fullWidth
        value={article.title || ''}
        onChange={(e) => handleOnChange({ ...article, title: e.target.value })}
      />

      <TextField
        label="e.g. news, culture, updates"
        fullWidth
        value={(article.tags || []).join(', ')}
        onChange={(e) => onChange({ ...article, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t !== '') })}
      />

      <TextField
        label="Summary"
        fullWidth
        value={article.summary || ''}
        onChange={(e) => handleOnChange({ ...article, summary: e.target.value })}
        multiline
      />

      <div className="flex flex-col flex-1 h-96 w-full space-y-2 mt-4" data-color-mode="light">
        <label className="text-sm transition-all duration-200 text-text-secondary">Content</label>
        <MDEditor
          value={article.content || ''}
          onChange={(val) => onChange({ ...article, content: val || '' })}
          height={400}
          className="w-full h-full"
        />
      </div>

      {/* TODO: Add this back when we have a better way to handle article publishing */}
      <div className="hidden items-center space-x-2 mt-4">
        <input
          type="checkbox"
          id="published"
          checked={article.published}
          onChange={(e) => onChange({ ...article, published: e.target.checked })}
          className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
        />
        <label htmlFor="published" className="text-text-primary">Publish immediately</label>
      </div>

      {Toast}
    </section>
  );
}