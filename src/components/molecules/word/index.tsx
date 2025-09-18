'use client';

import { WordDTO } from "@/models";
import { useState } from "react";
import { WordExamples, WordTitle, WordTranslations, WordType, WordDefinitions } from "@/components/atom";

export interface WordCardProps {
  onDelete: () => void;
  onEdit: (updatedWord: WordDTO) => void;
  word: WordDTO;
}

export default function WordCard({
  word,
  onDelete,
  onEdit,
}: WordCardProps) {

  const [localWord, setLocalWord] = useState<WordDTO>(word);
  const [isEditing, setIsEditing] = useState(false);

  function handleSave() {
    onEdit(localWord);
    setIsEditing(false);
  }

  function handleOnCancel() {
    setLocalWord(word); // Revert changes
    setIsEditing(false);
  }

  // TODO: Organize this card better because it's getting too big and loosing lot of space making the home page very 
  // weird and deorganized with too much space between cards
  return (
    <div className="max-w-sm mx-auto my-4 p-4 shadow-lg rounded-lg bg-white">
      <div className="mb-4">
        <WordTitle
          word={localWord.word}
          readOnly={!isEditing}
          onChange={newWord => setLocalWord({ ...localWord, word: newWord })}
        />
        <WordType type={localWord.type} readOnly={!isEditing} onChange={newType => setLocalWord({ ...localWord, type: newType })} />
        {/* TRANSLATIONS */}
        <WordTranslations
          translations={localWord.translations}
          readOnly={!isEditing}
          onChange={newTranslations => setLocalWord({ ...localWord, translations: newTranslations })}
        />
        {/* DEFINITIONS */}
        <WordDefinitions
          definitions={localWord.definitions}
          readOnly={!isEditing}
          onChange={newDefinitions => setLocalWord({ ...localWord, definitions: newDefinitions })}
        />
        {/* EXAMPLES */}
        <WordExamples
          examples={localWord.examples}
          readOnly={!isEditing}
          onChange={newExamples => setLocalWord({ ...localWord, examples: newExamples })}
        />
      </div>
      {/* Action buttons */}
      <div className="flex justify-end space-x-2">

        {
          isEditing ? (
            <>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => handleSave()}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleOnCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={onDelete}
              >
                Delete
              </button>
            </>
          )}
      </div>
    </div>
  );
};
