export interface WordDefinitionsProps {
  definitions?: string[];
  readOnly: boolean;
  onChange?: (newDefinitions: string[]) => void;
}

export function WordDefinitions({ definitions, readOnly, onChange }: WordDefinitionsProps) {

  function handleOnChange(value: string) {
    // clean empty lines
    const newDefinitions = value.split("\n").filter(t => t.trim() !== "");
    onChange?.(newDefinitions);
  }

  if (readOnly && (!definitions || definitions.length === 0)) return null;

  return readOnly ? (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-2">Definitions</h3>
      <ul className="list-disc list-inside text-text-primary space-y-1 ml-2">
        {definitions?.map((definition, index) => (
          <li key={index}>{definition}</li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="relative flex flex-col w-full mt-4 mb-2">
      <textarea
        id="wordDefinitions"
        className={`peer w-full bg-transparent text-text-primary p-4 border-2 border-gray-300 focus:border-primary rounded outline-none transition-colors duration-200 ${definitions?.length === 0 ? "border-red-500" : ""}`}
        rows={4}
        defaultValue={definitions?.join("\n")}
        onChange={e => handleOnChange(e.target.value)}
        placeholder="Enter definitions, one per line"
        required
      />
      <label
        htmlFor="wordDefinitions"
        className="absolute left-3 top-[-10px] px-1 text-sm transition-all duration-200 pointer-events-none bg-surface text-text-secondary peer-focus:text-primary"
      >
        Definitions
      </label>
      {
        definitions?.length === 0 && (
          <span className="text-red-500">This field is required *</span>
        )
      }
    </div>
  );
}