'use client';

import { useState, useEffect } from "react";
import { useHaveAccess } from "@/hooks";
import { useCustomRouter } from "@/hooks";
import { Action, ActionType } from "@/contants";
import { AddArticleDrawer, EditArticleDrawer, ArticlesTable } from "@/components/molecule";
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

  // Table state
  const [editingArticle, setEditingArticle] = useState<ArticleDTO | null>(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: getArticlesResponse, isError: isSearchError } = useSearchArticlesQuery({ value: debouncedSearch, limit, page });

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

  // --- Handlers for Create/Edit/Delete ---
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

  function handleEditClick(article: ArticleDTO) {
    setEditingArticle(article);
    setIsEditDrawerOpen(true);
  }

  async function handleSaveEdit(updatedArticle: ArticleDTO) {
    try {
      await updateArticleRequest(updatedArticle).unwrap();
      setIsEditDrawerOpen(false);
      setEditingArticle(null);
    } catch (err) {
      console.error('Failed to update article', err);
    }
  }

  async function handleDeleteEdit(articleId: string) {
    const response = confirm('Are you sure you want to delete this article?');
    if (response) {
      try {
        await eraseArticleRequest(articleId).unwrap();
        setIsEditDrawerOpen(false);
        setEditingArticle(null);
      } catch (err) {
        console.error('Failed to delete article', err);
      }
    }
  }

  // --- Handlers for Search & Paging ---
  function handleOnSearch() {
    setPage(1); // Reset to first page
    setDebouncedSearch(searchInput);
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleOnSearch();
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
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

      <ArticlesTable
        articlesResponse={getArticlesResponse}
        isSearchError={isSearchError}
        page={page}
        limit={limit}
        onEditClick={handleEditClick}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <AddArticleDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        direction={DrawerDirection.RIGHT_TO_LEFT}
        onSubmit={(form: IArticle) => handleOnSubmit(form)}
      />

      <EditArticleDrawer
        isOpen={isEditDrawerOpen}
        article={editingArticle}
        onClose={() => { setIsEditDrawerOpen(false); setEditingArticle(null); }}
        direction={DrawerDirection.RIGHT_TO_LEFT}
        onSubmit={(form: ArticleDTO) => handleSaveEdit(form)}
        onDelete={(id: string) => handleDeleteEdit(id)}
      />
    </main>
  );
}