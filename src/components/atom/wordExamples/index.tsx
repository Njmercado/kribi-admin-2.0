export interface WordExamplesProps {
  examples: string[];
  readOnly: boolean;
  onChange?: (newExamples: string[]) => void;
}

export function WordExamples({ examples, readOnly, onChange }: WordExamplesProps) {

  // TODO: Clean empty lines from examples
  function handleOnChange(value: string) {
    const newDefinitions = value.split("\n");
    onChange?.(newDefinitions);
  }

  return readOnly ? (
    <div className="mt-2">
      <h3 className="text-lg font-semibold">Examples:</h3>
      <ul className="list-disc list-inside text-gray-700">
        {examples.map((example, index) => (
          <li key={index}>{example}</li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="mt-2">
      <h3 className="text-lg font-semibold">Examples:</h3>
      <textarea
        className="w-full p-2 border border-gray-300 rounded mt-1"
        rows={4}
        value={examples.join("\n")}
        onChange={e => handleOnChange(e.target.value)}
        placeholder="Enter examples, one per line"
      />
    </div>
  );
}