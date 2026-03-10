'use client';

import { useEffect, useState } from "react";
import { Drawer, WordDefinitions, WordExamples, WordTitle, WordTranslations, Button, WordType } from '@/components/atom'
import { DrawerDirection } from '../../atom/drawer'
import { WordDTO, WordType as WordTypeEnum } from "@/models";

export interface EditWordDrawerProps {
  isOpen: boolean;
  word: WordDTO | null;
  onClose: () => void;
  onSave?: (form: WordDTO) => void;
  onDelete?: (id: string) => void;
  direction?: DrawerDirection;
}

export function EditWordDrawer({
  isOpen,
  word,
  onClose,
  onSave,
  onDelete,
  direction
}: EditWordDrawerProps) {

  const [localWord, setLocalWord] = useState<WordDTO | null>(null);
  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    if (word) {
      setLocalWord(word);
    } else {
      setLocalWord(null);
    }
  }, [word]);

  function handleOnSave() {
    if (localWord) {
      onSave?.(localWord);
    }
  }

  function handleOnDelete() {
    if (word?.id) {
      const response = window.confirm('Are you sure you want to delete this word?');
      if (response) {
        onDelete?.(word.id.toString());
      }
    }
  }

  useEffect(() => {
    if (!localWord || !word) {
      setDisableSubmit(true);
      return;
    }

    const isChanged = JSON.stringify(localWord) !== JSON.stringify(word);

    const isInvalid =
      localWord.word.length === 0 ||
      localWord.translations.join('').length === 0 ||
      localWord.definitions.join('').length === 0 ||
      localWord.examples.join('').length === 0;

    setDisableSubmit(!isChanged || isInvalid);
  }, [localWord, word]);

  // Handle case when word is null but drawer might be starting to close or open
  const displayWord = localWord || word;

  return (
    <Drawer
      direction={direction ?? DrawerDirection.BOTTOM_TO_TOP}
      isOpen={isOpen}
      onClose={onClose}
    >
      <article className="drawer-content flex flex-col h-full bg-surface">
        <section className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold tracking-wide">Edit Word</h2>
        </section>
        {displayWord ? (
          <section className="flex-1 overflow-y-auto p-4 space-y-4">
            <WordTitle word={displayWord.word} readOnly={false} onChange={(newWord) => setLocalWord({ ...displayWord, word: newWord })} />
            <WordType type={displayWord.type} readOnly={false} onChange={(chosenType: WordTypeEnum) => setLocalWord({ ...displayWord, type: chosenType })} />
            <WordTranslations translations={displayWord.translations} readOnly={false} onChange={(newTranslations) => setLocalWord({ ...displayWord, translations: newTranslations })} />
            <WordDefinitions definitions={displayWord.definitions} readOnly={false} onChange={(newDefinitions) => setLocalWord({ ...displayWord, definitions: newDefinitions })} />
            <WordExamples examples={displayWord.examples} readOnly={false} onChange={(newExamples) => setLocalWord({ ...displayWord, examples: newExamples })} />
          </section>
        ) : (
          <section className="flex-1 overflow-y-auto p-4 flex items-center justify-center">
            <p className="text-gray-500">No word selected.</p>
          </section>
        )}
        <section className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between">
          <Button
            variant="outlined"
            color="error"
            onClick={handleOnDelete}
            disabled={!displayWord}
          >
            Delete
          </Button>
          <div className="flex gap-2">
            <Button
              variant="text"
              color="primary"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOnSave}
              disabled={disableSubmit || !displayWord}
            >
              Save
            </Button>
          </div>
        </section>
      </article>
    </Drawer>
  );
}
