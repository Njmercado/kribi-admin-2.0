'use client';

import { useState, useEffect } from "react";
import { useHaveAccess } from "@/hooks";
import { useCustomRouter } from "@/hooks";
import { Action, ActionType } from "@/contants";
import { ArticleCard, AddArticleDrawer } from "@/components/molecule";
import { TextField, Button } from "@/components/atom";
import { ArticleDTO, IArticle } from "@/models";
import { DrawerDirection } from "@/components/atom/drawer";
import {
  useSearchArticlesQuery,
  useUpdateArticleMutation,
  useCreateArticleMutation,
  useDeleteArticleMutation
} from "@/libs/store/api/articleApiSlice";

export default function Article() {
  const { haveAccess } = useHaveAccess(Action.VIEW_ARTICLE as ActionType);
  const { goHome } = useCustomRouter();

  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: getArticlesResponse, isError: isSearchError } = useSearchArticlesQuery(debouncedSearch);

  const [updateArticleRequest] = useUpdateArticleMutation();
  const [createArticleRequest] = useCreateArticleMutation();
  const [eraseArticleRequest] = useDeleteArticleMutation();

  // Avoid SSR crashes by only checking on mount
  useEffect(() => {
    if (!haveAccess()) {
      goHome();
    }
  }, [haveAccess, goHome]);

  if (!haveAccess()) {
    return null;
  }

  async function handleOnDelete(articleId: number | string) {
    const response = confirm('Are you sure you want to delete this article?');
    if (response) {
      try {
        await eraseArticleRequest(articleId.toString()).unwrap();
      } catch (err) {
        console.error('Failed to delete article', err);
      }
    }
  }

  async function handleOnEdit(article: ArticleDTO) {
    try {
      await updateArticleRequest(article).unwrap();
    } catch (err) {
      console.error('Failed to update article', err);
    }
  }

  function handleOnSearch() {
    setDebouncedSearch(searchInput);
  }

  function handleAddArticle() {
    setIsDrawerOpen(true);
  }

  async function handleOnSubmit(form: IArticle) {
    try {
      await createArticleRequest(form).unwrap();
      setIsDrawerOpen(false);
    } catch (err) {
      console.error('Failed to create article', err);
    }
  }

  // Handle Enter key for search
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleOnSearch();
    }
  };

  return (
    <main className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 py-8">
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="w-full sm:w-1/2">
          <TextField
            label="Search Article"
            fullWidth
            onChange={event => setSearchInput(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outlined" color="primary" onClick={handleOnSearch}>Search</Button>
          <Button variant="contained" color="secondary" onClick={handleAddArticle}>Add Article</Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {
          !isSearchError && getArticlesResponse?.map((article: ArticleDTO, index: number) => (
            <ArticleCard
              key={index}
              article={article}
              onDelete={() => handleOnDelete(article.id)}
              onEdit={(updatedArticle: ArticleDTO) => handleOnEdit(updatedArticle)}
            />
          ))
        }
      </section>

      <AddArticleDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        direction={DrawerDirection.RIGHT_TO_LEFT}
        onSubmit={(form: IArticle) => handleOnSubmit(form)}
      />
    </main>
  )
}