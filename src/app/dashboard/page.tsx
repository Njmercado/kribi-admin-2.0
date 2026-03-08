'use client'

import { useState, useEffect } from "react"
import { AddWordDrawer, EditWordDrawer, WordsTable } from "@/components/molecule";
import { TextField, Button } from "@/components/atom";
import { WordDTO, IWord, WordSearchDTO } from "@/models";
import { useRequest, search, update, create, erase } from "@/api";
import { DrawerDirection } from "@/components/atom/drawer";

export default function Home() {

  const [searchInput, setSearchInput] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<WordDTO | null>(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { request: updateWordRequest } = useRequest<WordDTO>(update);
  const { request: createWordRequest } = useRequest<WordDTO>(create);
  const { request: eraseWordRequest } = useRequest(erase);
  const { response: getWordsResponse, request: searchWordRequest, isError: isSearchError } = useRequest<WordSearchDTO>(search);

  function handleEditClick(word: WordDTO) {
    setEditingWord(word);
    setIsEditDrawerOpen(true);
  }

  function handleSaveEdit(updatedWord: WordDTO) {
    updateWordRequest(updatedWord);
    setIsEditDrawerOpen(false);
    setEditingWord(null);
  }

  function handleDeleteEdit(wordId: string) {
    eraseWordRequest(wordId);
    setIsEditDrawerOpen(false);
    setEditingWord(null);
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  async function handleOnSearch() {
    searchWordRequest(searchInput);
  }

  function handleAddWord() {
    setIsDrawerOpen(true);
  }

  function handleOnSubmit(form: IWord) {
    createWordRequest(form);
    setIsDrawerOpen(false);
  }

  useEffect(() => {
    searchWordRequest(searchInput, limit, page);
  }, [page, limit, searchInput, searchWordRequest]);

  return (
    <main className="max-w-7xl mx-auto">
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="w-full sm:w-1/2">
          <TextField
            label="Search word"
            fullWidth
            onChange={event => setSearchInput(event.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outlined" color="primary" onClick={handleOnSearch}>Search</Button>
          <Button variant="contained" color="secondary" onClick={handleAddWord}>Add Word</Button>
        </div>
      </section>

      <WordsTable
        wordsResponse={getWordsResponse}
        isSearchError={isSearchError}
        page={page}
        limit={limit}
        onEditClick={handleEditClick}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        setPage={setPage}
      />

      <AddWordDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        direction={DrawerDirection.RIGHT_TO_LEFT}
        onSubmit={(form: IWord) => handleOnSubmit(form)}
      />

      <EditWordDrawer
        isOpen={isEditDrawerOpen}
        word={editingWord}
        onClose={() => { setIsEditDrawerOpen(false); setEditingWord(null); }}
        direction={DrawerDirection.RIGHT_TO_LEFT}
        onSave={(form: WordDTO) => handleSaveEdit(form)}
        onDelete={(id: string) => handleDeleteEdit(id)}
      />
    </main>
  )
}
