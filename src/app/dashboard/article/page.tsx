'use client';

import { useState, useEffect } from "react";
import { useHaveAccess, useAlert, AlertType } from "@/hooks";
import { useCustomRouter } from "@/hooks";
import { Action, ActionType } from "@/contants";
import { ArticlesTable } from "@/components/molecule";
import { AddArticleDrawer, EditArticleDrawer } from "@/components/organism";
import { TextField, Button } from "@/components/atom";
import { ArticleDTO, IArticle } from "@/models";
import { DrawerDirection } from "@/components/atom/drawer";
import {
  useSearchArticlesQuery,
  useUpdateArticleMutation,
  useCreateArticleMutation,
  useDeleteArticleMutation
} from "@/libs/store/api/articleApiSlice";
import { ArticleActionsMessages } from "@/contants/article.constant";

export default function Article() {
  const { haveAccess } = useHaveAccess();
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

  const { openAlert, Toast } = useAlert();

  // Avoid SSR crashes by only checking on mount
  useEffect(() => {
    if (!haveAccess(Action.VIEW_ARTICLE as ActionType)) {
      goHome();
    }
  }, [haveAccess, goHome]);

  // --- Handlers for Create/Edit/Delete ---
  function handleAddArticle() {
    setIsDrawerOpen(true);
  }

  async function handleOnSubmit(form: IArticle) {
    try {
      await createArticleRequest(form).unwrap();
      setIsDrawerOpen(false);
      openAlert(ArticleActionsMessages.ARTICLE_CREATED_SUCCESSFULLY, AlertType.SUCCESS);
    } catch (err) {
      openAlert(err as string, AlertType.ERROR);
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
      openAlert(ArticleActionsMessages.ARTICLE_UPDATED_SUCCESSFULLY, AlertType.SUCCESS);
    } catch (err) {
      openAlert(err as string, AlertType.ERROR);
    }
  }

  async function handleDeleteEdit(articleId: string) {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        await eraseArticleRequest(articleId).unwrap();
        setIsEditDrawerOpen(false);
        setEditingArticle(null);
        openAlert(ArticleActionsMessages.ARTICLE_DELETED_SUCCESSFULLY, AlertType.SUCCESS);
      } catch (err) {
        openAlert(err as string, AlertType.ERROR);
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

      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-2">Articles Management</h1>
        <p className="text-text-secondary">Search, view and manage articles</p>
      </section>

      <section className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <div className="w-full sm:flex-1">
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
        onClose={() => {
          setIsEditDrawerOpen(false);
          setEditingArticle(null);
        }}
        direction={DrawerDirection.RIGHT_TO_LEFT}
        onSubmit={(form: ArticleDTO) => handleSaveEdit(form)}
        onDelete={(id: string) => handleDeleteEdit(id)}
      />

      {Toast}
    </main>
  );
}