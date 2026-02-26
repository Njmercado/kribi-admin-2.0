'use client'

import { useState } from "react"
import { WordCard, AddWordDrawer } from "@/components/molecule";
import { TextField, Button } from "@/components/atom";
import { WordDTO, IWord } from "@/models";
import { useRequest, search, update, create, erase } from "@/api";
import { DrawerDirection } from "@/components/atom/drawer";

export default function Home() {

  const [searchInput, setSearchInput] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { request: updateWordRequest } = useRequest<WordDTO>(update);
  const { request: createWordRequest } = useRequest<WordDTO>(create);
  const { request: eraseWordRequest } = useRequest(erase);
  const { response: getWordsResponse, request: searchWordRequest, isError: isSearchError } = useRequest<Array<WordDTO>>(search);

  function handleOnDelete(wordId: number | string) {
    const response = confirm('Are you sure you want to delete this word?');
    if (response) {
      eraseWordRequest(wordId.toString());
    }
  }

  function handleOnEdit(word: WordDTO) {
    updateWordRequest(word);
  }

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

      <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {
          !isSearchError && getWordsResponse?.map((word: WordDTO, index: number) => (
            <WordCard
              key={index}
              word={word}
              onDelete={() => handleOnDelete(word.id as string)}
              onEdit={(updateWord: WordDTO) => handleOnEdit(updateWord)}
            />
          ))
        }
      </article>

      <AddWordDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        direction={DrawerDirection.RIGHT_TO_LEFT}
        onSubmit={(form: IWord) => handleOnSubmit(form)}
      />
    </main>
  )
}
