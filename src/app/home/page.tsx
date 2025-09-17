'use client'

import { useEffect, useState } from "react"
import { WordCard } from "@/components/molecules";
import { WordDTO } from "@/models";
import { WORD_DEFAULT_VALUES, WORD_DEFAULT_VALUES_ON_ADD, SUBMIT_ACTIONS, SubmitAction } from "@/contants";
import { WordDrawer } from "@/components/molecules";
import { useCustomRouter } from "@/utils";
import { useRequest, search, update } from "@/api";

export default function Home() {

  const [searchInput, setSearchInput] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [wordData, setWordData] = useState<WordDTO>(WORD_DEFAULT_VALUES);
  const { goLogin } = useCustomRouter();
  const {
    response: putWordResponse,
    isLoading: putWordIsLoading,
    request: updateWordRequest,
    error: putWordError
  } = useRequest<WordDTO>(update);
  const { response: getWordsResponse, request: searchWordRequest, isError: isSearchError } = useRequest<Array<WordDTO>>(search);

  function handleOnDelete(wordId: number | string) {
    const response = confirm('Are you sure you want to delete this word?');
    if (response) {
      console.log(`Deleting word with id: ${wordId}`);
    }
  }

  function handleOnEdit(word: WordDTO) {
    setWordData(word);
  }

  async function handleOnSearch() {
    searchWordRequest(searchInput);
  }

  function handleAddWord() {
    setWordData(WORD_DEFAULT_VALUES_ON_ADD);
  }

  function handleCloseDrawer() {
    setWordData(WORD_DEFAULT_VALUES);
    setIsDrawerOpen(false);
  };

  function handleOnSubmit(form: WordDTO, action: SubmitAction) {
    if (action === SUBMIT_ACTIONS.ADD) { form._id = '-1' }
    updateWordRequest(form);
  }

  // Close the drawer when the word is added/updated
  // TODO: Show error message when the word is not added/updated
  useEffect(() => {
    if (putWordResponse && putWordIsLoading === false) {
      handleCloseDrawer();
    }
  }, [putWordIsLoading, putWordError, putWordResponse]);

  useEffect(() => {
    if (wordData.word === WORD_DEFAULT_VALUES.word) return;
    setIsDrawerOpen(true);
  }, [wordData]);

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
              onDelete={() => handleOnDelete(word._id as string)}
              onEdit={() => handleOnEdit(word)}
            />
          ))
        }
      </article>

      <WordDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        data={wordData}
        onSubmit={(form: WordDTO, action: SubmitAction) => handleOnSubmit(form, action)}
      />
    </main>
  )
}