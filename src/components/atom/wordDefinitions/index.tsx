export interface WordDefinitionsProps {
  definitions?: string[];
  readOnly: boolean;
  onChange?: (newDefinitions: string[]) => void;
}

export function WordDefinitions({ definitions, readOnly, onChange }: WordDefinitionsProps) {

  // TODO: Clean empty lines from definitions
  function handleOnChange(value: string) {
    const newDefinitions = value.split("\n");
    onChange?.(newDefinitions);
  }

  return readOnly ? (
    <div className="mt-2">
      <h3 className="text-lg font-semibold">Definitions:</h3>
      <ul className="list-disc list-inside text-gray-700">
        {definitions?.map((definition, index) => (
          <li key={index}>{definition}</li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="mt-2">
      <h3 className="text-lg font-semibold">Definitions:</h3>
      <textarea
        className="w-full p-2 border border-gray-300 rounded mt-1"
        rows={4}
        value={definitions?.join("\n")}
        onChange={e => handleOnChange(e.target.value)}
        placeholder="Enter definitions, one per line"
      />
    </div>
  );
}