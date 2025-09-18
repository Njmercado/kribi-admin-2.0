'use client'

import { useState } from "react"
import { WordCard } from "@/components/molecules";
import { WordDTO, IWord } from "@/models";
import { AddWordDrawer } from "@/components/molecules";
import { useCustomRouter } from "@/utils";
import { useRequest, search, update, create } from "@/api";
import { DrawerDirection } from "@/components/atom/drawer";

export default function Home() {

  const [searchInput, setSearchInput] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { goLogin } = useCustomRouter();
  const { request: updateWordRequest } = useRequest<WordDTO>(update);
  const { request: createWordRequest } = useRequest<WordDTO>(create);
  const { response: getWordsResponse, request: searchWordRequest, isError: isSearchError } = useRequest<Array<WordDTO>>(search);

  function handleOnDelete(wordId: number | string) {
    const response = confirm('Are you sure you want to delete this word?');
    if (response) {
      console.log(`Deleting word with id: ${wordId}`);
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
    <main>
      <article className="flex flex-col">
        <section className="flex flex-row justify-between">
          <h1 className="text-center text-2xl">Hola user</h1>
          <button onClick={goLogin} className="bg-red-500 rounded-md p-2 text-white font-bold">salir</button>
        </section>
        <section className="flex max-sm:flex-col sm:flex-row items-center justify-center gap-2">
          <input
            type="text"
            placeholder="Buscar palabra"
            className="text-black rounded-md border-solid border-2 border-black p-2 max-sm:w-full sm:w-1/2"
            onChange={event => setSearchInput(event.target.value)}
          />
          <div className="flex flex-row gap-2">
            <button onClick={handleOnSearch} className="bg-amber-900 p-2 rounded-md text-white font-bold">Buscar</button>
            <button onClick={handleAddWord} className="bg-green-800 p-2 rounded-md text-white font-bold">Agregar palabra</button>
          </div>
        </section>
      </article>
      <article className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
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
