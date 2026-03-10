'use client';

import { useEffect, useState } from "react";
import { Drawer, WordDefinitions, WordExamples, WordTitle, WordTranslations, Button, WordType } from '@/components/atom'
import { DrawerDirection } from '../../atom/drawer'
import { IWord, WordType as WordTypeEnum } from "@/models";

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
      <article className="drawer-content flex flex-col h-full bg-surface">
        <section className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold tracking-wide">Add Word</h2>
        </section>
        <section className="flex-1 overflow-y-auto p-4 space-y-4">
          <WordTitle readOnly={false} onChange={(newWord) => setWord({ ...word, word: newWord })} />
          <WordType readOnly={false} onChange={(chosenType: WordTypeEnum) => setWord({ ...word, type: chosenType })} />
          <WordTranslations readOnly={false} onChange={(newTranslations) => setWord({ ...word, translations: newTranslations })} />
          <WordDefinitions readOnly={false} onChange={(newDefinitions) => setWord({ ...word, definitions: newDefinitions })} />
          <WordExamples readOnly={false} onChange={(newExamples) => setWord({ ...word, examples: newExamples })} />
        </section>
        <section className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleOnSubmit}
            disabled={disableSubmit}
          >
            Submit
          </Button>
        </section>
      </article>
    </Drawer>
  );
}