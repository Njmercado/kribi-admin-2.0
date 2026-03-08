'use client';

import { useState, useEffect } from "react";
import { useHaveAccess } from "@/hooks";
import { useCustomRouter } from "@/hooks";
import { Action, ActionType } from "@/contants";
import { ArticleCard, AddArticleDrawer } from "@/components/molecule";
import { TextField, Button } from "@/components/atom";
import { ArticleDTO, IArticle } from "@/models";
import { useRequest } from "@/api";
// Assuming articleAPI is exported exactly like this
import * as articleAPI from "@/api/articleAPI";
import { DrawerDirection } from "@/components/atom/drawer";

export default function Article() {
  const { haveAccess } = useHaveAccess(Action.VIEW_ARTICLE as ActionType);
  const { goHome } = useCustomRouter();

  const [searchInput, setSearchInput] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { request: updateArticleRequest } = useRequest<ArticleDTO>(articleAPI.update);
  const { request: createArticleRequest } = useRequest<ArticleDTO>(articleAPI.create);
  const { request: eraseArticleRequest } = useRequest(articleAPI.erase);
  const { response: getArticlesResponse, request: searchArticleRequest, isError: isSearchError } = useRequest<Array<ArticleDTO>>(articleAPI.search);

  // Avoid SSR crashes by only checking on mount
  useEffect(() => {
    if (!haveAccess()) {
      goHome();
    }
  }, [haveAccess, goHome]);

  if (!haveAccess()) {
    return null;
  }

  function handleOnDelete(articleId: number | string) {
    const response = confirm('Are you sure you want to delete this article?');
    if (response) {
      eraseArticleRequest(articleId.toString());
    }
  }

  function handleOnEdit(article: ArticleDTO) {
    updateArticleRequest(article);
  }

  function handleOnSearch() {
    searchArticleRequest(searchInput);
  }

  function handleAddArticle() {
    setIsDrawerOpen(true);
  }

  function handleOnSubmit(form: IArticle) {
    createArticleRequest(form);
    setIsDrawerOpen(false);
  }

  return (
    <main className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 py-8">
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="w-full sm:w-1/2">
          <TextField
            label="Search Article"
            fullWidth
            onChange={event => setSearchInput(event.target.value)}
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