'use client'

import { useState } from "react"
import { AddWordDrawer, EditWordDrawer, WordsTable } from "@/components/molecule";
import { TextField, Button } from "@/components/atom";
import { WordDTO, IWord } from "@/models";
import { DrawerDirection } from "@/components/atom/drawer";
import {
  useSearchWordsQuery,
  useCreateWordMutation,
  useUpdateWordMutation,
  useDeleteWordMutation
} from "@/libs/store/api/wordApiSlice";

export default function Home() {

  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<WordDTO | null>(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: getWordsResponse, isError: isSearchError } = useSearchWordsQuery({
    word: debouncedSearch,
    limit,
    page
  });

  const [updateWordRequest] = useUpdateWordMutation();
  const [createWordRequest] = useCreateWordMutation();
  const [eraseWordRequest] = useDeleteWordMutation();

  function handleEditClick(word: WordDTO) {
    setEditingWord(word);
    setIsEditDrawerOpen(true);
  }

  async function handleSaveEdit(updatedWord: WordDTO) {
    try {
      await updateWordRequest(updatedWord).unwrap();
      setIsEditDrawerOpen(false);
      setEditingWord(null);
    } catch (err) {
      console.error('Failed to update word', err);
    }
  }

  async function handleDeleteEdit(wordId: string) {
    try {
      await eraseWordRequest(wordId).unwrap();
      setIsEditDrawerOpen(false);
      setEditingWord(null);
    } catch (err) {
      console.error('Failed to delete word', err);
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

  function handleOnSearch() {
    setPage(1);
    setDebouncedSearch(searchInput);
  }

  function handleAddWord() {
    setIsDrawerOpen(true);
  }

  async function handleOnSubmit(form: IWord) {
    try {
      await createWordRequest(form).unwrap();
      setIsDrawerOpen(false);
    } catch (err) {
      console.error('Failed to create word', err);
    }
  }

  // Handle Enter key for search
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleOnSearch();
    }
  };

  return (
    <main className="max-w-7xl mx-auto">

      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-2">Words Management</h1>
        <p className="text-text-secondary">Search, view and manage Words</p>
      </section>

      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="w-full sm:flex-1">
          <TextField
            label="Search word"
            fullWidth
            onChange={event => setSearchInput(event.target.value)}
            onKeyDown={handleKeyDown}
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
