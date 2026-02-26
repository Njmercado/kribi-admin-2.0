'use client';

import { WordDTO } from "@/models";
import { useState } from "react";
import { WordExamples, WordTitle, WordTranslations, WordType, WordDefinitions } from "@/components/atom";
import { Card, CardContent, CardActions, Button } from "@/components/atom";

export interface WordCardProps {
  onDelete: () => void;
  onEdit: (updatedWord: WordDTO) => void;
  word: WordDTO;
}

export function WordCard({
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

  return (
    <Card elevation={2} className="flex flex-col h-full w-full max-w-sm">
      <CardContent className="flex-1 pt-4">
        <WordTitle
          word={localWord.word}
          readOnly={!isEditing}
          onChange={newWord => setLocalWord({ ...localWord, word: newWord })}
        />
        <WordType
          type={localWord.type}
          readOnly={!isEditing}
          onChange={newType => setLocalWord({ ...localWord, type: newType })}
        />
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
      </CardContent>
      {/* Action buttons */}
      <CardActions className="bg-gray-50 border-t border-gray-100 p-4">
        {isEditing ? (
          <>
            <Button variant="text" color="primary" onClick={handleOnCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Button variant="outlined" color="primary" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
            <Button variant="outlined" color="error" onClick={onDelete}>
              Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}
