'use client'

import { useState } from "react"
import { WordCard } from "@/components/molecules";
import { WordDTO } from "@/models";
import { WORD_EXAMPLES } from "@/contants";
import { WordDrawer } from "@/components/molecules";

export default function Home() {

  const [search, setSearch] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function handleOnDelete(wordId: number) {
    const response = confirm('Are you sure you want to delete this word?');
    if(response) {
      console.log(`Deleting word with id: ${wordId}`);
    }
  }

  function handleOnEdit(word: WordDTO) {
    // open bottom drawer to edit word
    console.log(`Editing word: ${word.word}`);
    setIsDrawerOpen(true);
  }

  function handleOnSearch() {
    // TODO: Develop logic to search word
  }

  function handleAddWord() {
    // open right drawer to add word
  }

  function handleCloseDrawer() {
    setIsDrawerOpen(false);
  };

  return (
    <main className="p-4">
      <article className="flex flex-col">
        <section className="flex flex-row justify-between">
          <h1 className="text-center text-2xl">Hola user</h1>
          <button className="bg-red-500 rounded-md p-2 text-white font-bold">salir</button>
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
      />
    </main>
  )
}