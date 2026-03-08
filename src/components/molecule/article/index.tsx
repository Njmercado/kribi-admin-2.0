'use client';

import { useState } from 'react';
import { Card, CardContent, CardActions, CardHeader, Button, TextField, Chip, IconButton } from '@/components/atom';
import { ArticleDTO } from '@/models';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });
const MDPreview = dynamic(() => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown), { ssr: false });

interface ArticleCardProps {
  article: ArticleDTO;
  onDelete?: () => void;
  onEdit?: (article: ArticleDTO) => void;
}

export function ArticleCard({ article, onDelete, onEdit }: ArticleCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedArticle, setEditedArticle] = useState<ArticleDTO>({ ...article });

  function handleSave() {
    onEdit?.(editedArticle);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditedArticle({ ...article });
    setIsEditing(false);
  }

  return (
    <Card elevation={isEditing ? 8 : 2} className={`transition-all duration-300 ${isEditing ? 'border-primary ring-2 ring-primary/20 bg-white' : 'hover:-translate-y-1 hover:shadow-elevation-4 bg-surface'}`}>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          {isEditing ? (
            <div className="w-full pr-4">
              <TextField
                label="Article Title"
                value={editedArticle.title}
                onChange={(e) => setEditedArticle({ ...editedArticle, title: e.target.value })}
                fullWidth
              />
            </div>
          ) : (
            <h2 className="text-2xl font-bold tracking-tight text-text-primary capitalize break-words">{article.title}</h2>
          )}
          <div className="flex gap-2">
            {!isEditing && (
              <Chip
                label={article.published ? 'Published' : 'Draft'}
                color={article.published ? 'primary' : 'default'}
                variant={article.published ? 'filled' : 'outlined'}
              />
            )}
            <IconButton color="error" onClick={onDelete} title="Delete Article" disabled={isEditing}>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {isEditing ? (
          <div className="space-y-4" data-color-mode="light">
            <div className="flex flex-col space-y-2">
              <label className="text-sm transition-all duration-200 text-text-secondary">Tags (comma separated)</label>
              <TextField
                label="e.g. news, culture, updates"
                fullWidth
                value={editedArticle.tags.join(', ')}
                onChange={(e) => {
                  setEditedArticle({ ...editedArticle, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t !== '') });
                }}
              />
            </div>
            <div className="flex flex-col space-y-2 flex-1 min-h-[300px]">
              <label className="text-sm transition-all duration-200 text-text-secondary">Content</label>
              <MDEditor
                value={editedArticle.content}
                onChange={(val) => setEditedArticle({ ...editedArticle, content: val || '' })}
                height={300}
                className="w-full"
              />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id={`published-${article.id}`}
                checked={editedArticle.published}
                onChange={(e) => setEditedArticle({ ...editedArticle, published: e.target.checked })}
                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor={`published-${article.id}`} className="text-text-primary">Published</label>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, i) => (
                  <Chip key={i} label={tag} variant="outlined" />
                ))}
              </div>
            )}
            <div className="prose prose-sm max-w-none text-text-secondary line-clamp-3 overflow-hidden text-ellipsis" data-color-mode="light">
              <MDPreview source={article.content} style={{ whiteSpace: 'pre-wrap', backgroundColor: 'transparent', color: 'inherit' }} />
            </div>
          </div>
        )}
      </CardContent>

      <CardActions>
        {isEditing ? (
          <>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              <CloseIcon className="w-5 h-5 mr-1" />
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              <SaveIcon className="w-5 h-5 mr-1" />
              Save
            </Button>
          </>
        ) : (
          <Button variant="outlined" color="primary" onClick={() => setIsEditing(true)}>
            <EditIcon className="w-5 h-5 mr-1" />
            Edit Article
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
