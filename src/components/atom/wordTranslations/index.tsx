export interface WordTranslationsProps {
  translations?: string[];
  readOnly: boolean;
  onChange?: (newTranslations: string[]) => void;
}

export function WordTranslations({ translations, readOnly, onChange }: WordTranslationsProps) {

  function handleOnChange(value: string) {
    // clean empty lines
    const newTranslations = value.split("\n").filter(t => t.trim() !== "");
    onChange?.(newTranslations);
  }

  if (readOnly && (!translations || translations.length === 0)) return null;

  return readOnly ? (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-2">Translations</h3>
      <ul className="list-disc list-inside text-text-primary space-y-1 ml-2">
        {translations?.map((translation, index) => (
          <li key={index}>{translation}</li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="relative flex flex-col w-full mt-4 mb-2">
      <textarea
        id="wordTranslations"
        className={`peer w-full bg-transparent text-text-primary p-4 border-2 border-gray-300 focus:border-primary rounded outline-none transition-colors duration-200 ${translations?.length === 0 ? "border-red-500" : ""}`}
        rows={4}
        defaultValue={translations?.join("\n")}
        onChange={e => handleOnChange(e.target.value)}
        placeholder="Enter translations, one per line"
        required
      />
      <label
        htmlFor="wordTranslations"
        className="absolute left-3 top-[-10px] px-1 text-sm transition-all duration-200 pointer-events-none bg-surface text-text-secondary peer-focus:text-primary"
      >
        Translations
      </label>
      {
        translations?.length === 0 && (
          <span className="text-red-500">This field is required *</span>
        )
      }
    </div>
  );
}