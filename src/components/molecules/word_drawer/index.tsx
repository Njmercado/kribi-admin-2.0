'use client';

import { useEffect, useState } from "react";
import { Drawer, WordDefinitions, WordExamples, WordTitle, WordTranslations } from '@/components/atom'
import { DrawerDirection } from '../../atom/drawer'
import { IWord, WordType as WordTypeEnum } from "@/models";
import { WordType } from "@/components/atom";

export type ActionType = 'ADD' | 'UPDATE';

export interface WordDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (form: IWord) => void;
  direction?: DrawerDirection;
}

export function AddWordDrawer({
  isOpen,
  onClose,
  onSubmit,
  direction
}: WordDrawerProps) {

  const [word, setWord] = useState<IWord>({
    word: '',
    language: 'palenque',
    type: WordTypeEnum.NOUN,
    translations: [],
    definitions: [],
    examples: []
  });
  const [disableSubmit, setDisableSubmit] = useState(true);

  function handleOnSubmit() {
    onSubmit?.(word);
  }

  useEffect(() => {
    const DISABLE = 
      word.word.length === 0 || 
      word.translations.join('').length === 0 ||
      word.definitions.join('').length === 0 || 
      word.examples.join('').length === 0;
    setDisableSubmit(DISABLE)
  }, [word]);

  // TODO: build general button component
  return (
    <Drawer
      direction={direction ?? DrawerDirection.BOTTOM_TO_TOP}
      isOpen={isOpen}
      onClose={onClose}
    >
      <article className="drawer-content">
        <section className="flex flex-col gap-2 p-2">
          <h2 className="text-2xl font-bold text-center">Add Word</h2>
        </section>
        <section className="flex flex-col gap-2">
          <WordTitle readOnly={false} onChange={(newWord) => setWord({ ...word, word: newWord })} />
          <select name="language" defaultValue={'palenque'}>
            <option value="spanish">Espanol</option>
            <option value="palenque">Palenque</option>
          </select>
          <WordType readOnly={false} onChange={(chosenType: WordTypeEnum) => setWord({ ...word, type: chosenType })} />
          <WordTranslations readOnly={false} onChange={(newTranslations) => setWord({ ...word, translations: newTranslations })} />
          <WordDefinitions readOnly={false} onChange={(newDefinitions) => setWord({ ...word, definitions: newDefinitions })} />
          <WordExamples readOnly={false} onChange={(newExamples) => setWord({ ...word, examples: newExamples })} />
          <button
            type="button"
            onClick={handleOnSubmit}
            className={`rounded-md bg-blue-400 p-2 text-white font-bold ${disableSubmit ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            disabled={disableSubmit}
          >
            submit
          </button>
        </section>
      </article>
    </Drawer>
  );
}