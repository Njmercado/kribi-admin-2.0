'use client';

import { IWord } from "@/models";

export interface WordCardProps extends IWord {
  onDelete: () => void;
  onEdit: () => void;
  definitions: string[];
  examples: string[];
  translations: string[];
  type: string;
}

export default function WordCard({
  word,
  definitions,
  examples,
  translations,
  type,
  onDelete,
  onEdit,
}: WordCardProps) {
  return (
    <div className="max-w-sm mx-auto my-4 p-4 shadow-lg rounded-lg bg-white">
      <div className="mb-4">
        <h2 className="text-xl font-bold">{word}</h2>
        <p className="text-sm text-gray-600">{type}</p>
        {/* TRANSLATIONS */}
        <div className="mt-2">
          <h3 className="text-lg font-semibold">Translations:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {translations.map((translation, index) => (
              <li key={index}>{translation}</li>
            ))}
          </ul>
        </div>
        {/* DEFINITIONS */}
        <div className="mt-2">
          <h3 className="text-lg font-semibold">Definitions:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {definitions.map((definition, index) => (
              <li key={index}>{definition}</li>
            ))}
          </ul>
        </div>
        {/* EXAMPLES */}
        <div className="mt-2">
          <h3 className="text-lg font-semibold">Examples:</h3>
          <ul className="list-disc list-inside text-gray-500 italic">
            {examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Action buttons */}
      <div className="flex justify-end space-x-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
