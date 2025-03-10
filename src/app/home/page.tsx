'use client'

import { useEffect, useState } from "react"
import { WordCard } from "@/components/molecules";
import { WordDTO } from "@/models";
import { WORD_EXAMPLES, WORD_DEFAULT_VALUES, WORD_DEFAULT_VALUES_ON_ADD } from "@/contants";
import { WordDrawer } from "@/components/molecules";
import { useCustomRouter } from "@/utils";
import { useAPI } from "@/api";

export default function Home() {

  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [wordData, setWordData] = useState<WordDTO>(WORD_DEFAULT_VALUES);
  const { goLogin } = useCustomRouter();
  const { isLoading, error, response, submit } = useAPI();

  function handleOnDelete(wordId: number) {
    const response = confirm('Are you sure you want to delete this word?');
    if(response) {
      console.log(`Deleting word with id: ${wordId}`);
    }
  }

  function handleOnEdit(word: WordDTO) {
    setWordData(word);
  }

  function handleOnSearch() {
    // TODO: Develop logic to search word
  }

  function handleAddWord() {
    setWordData(WORD_DEFAULT_VALUES_ON_ADD);
  }

  function handleCloseDrawer() {
    setWordData(WORD_DEFAULT_VALUES);
    setIsDrawerOpen(false);
  };

  function handleOnSubmit(form: WordDTO) {
    console.log('Word data:', form);
    submit('PUT_WORD', form);
    setIsDrawerOpen(false);
  }

  useEffect(() => {
    if(wordData.word === WORD_DEFAULT_VALUES.word) return;
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
            onChange={event => setSearch(event.target.value)}
          />
          <div className="flex flex-row gap-2">
            <button onClick={handleOnSearch} className="bg-amber-900 p-2 rounded-md text-white font-bold">Buscar</button>
            <button onClick={handleAddWord} className="bg-green-800 p-2 rounded-md text-white font-bold">Agregar palabra</button>
          </div>
        </section>
      </article>
      <article className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {
          WORD_EXAMPLES.words.map((word: WordDTO, index: number) => (
            <WordCard
              key={index}
              word={word.word}
              definitions={word.definitions}
              examples={word.examples}
              translations={word.translations}
              type={word.type}
              onDelete={() => handleOnDelete(index)}
              onEdit={() => handleOnEdit(word)}
            />
          ))
        }
      </article>

      <WordDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        data={wordData}
        onSubmit={(form: WordDTO) => handleOnSubmit(form)}
      />
    </main>
  )
}