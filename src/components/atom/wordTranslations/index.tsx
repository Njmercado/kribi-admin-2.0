export interface WordTranslationsProps {
  translations: string[];
  readOnly: boolean;
  onChange?: (newTranslations: string[]) => void;
}

export function WordTranslations({ translations, readOnly, onChange }: WordTranslationsProps) {

  // TODO: Clean empty lines from translations
  function handleOnChange(value: string) {
    const newTranslations = value.split("\n");
    onChange?.(newTranslations);
  }

  return readOnly ? (
    <div className="mt-2">
      <h3 className="text-lg font-semibold">Translations:</h3>
      <ul className="list-disc list-inside text-gray-700">
        {translations.map((translation, index) => (
          <li key={index}>{translation}</li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="mt-2">
      <h3 className="text-lg font-semibold">Translations:</h3>
      <textarea
        className="w-full p-2 border border-gray-300 rounded mt-1"
        rows={4}
        value={translations.join("\n")}
        onChange={e => handleOnChange(e.target.value)}
        placeholder="Enter translations, one per line"
      />
    </div>
  );
}