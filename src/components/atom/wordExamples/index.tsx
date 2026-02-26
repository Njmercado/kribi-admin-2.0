export interface WordExamplesProps {
  examples?: string[];
  readOnly: boolean;
  onChange?: (newExamples: string[]) => void;
}

export function WordExamples({ examples, readOnly, onChange }: WordExamplesProps) {

  function handleOnChange(value: string) {
    // clean empty lines
    const newExamples = value.split("\n").filter(t => t.trim() !== "");
    onChange?.(newExamples);
  }

  if (readOnly && (!examples || examples.length === 0)) return null;

  return readOnly ? (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-2">Examples</h3>
      <ul className="list-disc list-inside text-text-primary space-y-1 ml-2">
        {examples?.map((example, index) => (
          <li key={index} className="italic text-gray-600">&quot;{example}&quot;</li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="relative flex flex-col w-full mt-4 mb-2">
      <textarea
        id="wordExamples"
        className="peer w-full bg-transparent text-text-primary p-4 border-2 border-gray-300 focus:border-primary rounded outline-none transition-colors duration-200"
        rows={4}
        defaultValue={examples?.join("\n")}
        onChange={e => handleOnChange(e.target.value)}
        placeholder="Enter examples, one per line"
      />
      <label
        htmlFor="wordExamples"
        className="absolute left-3 top-[-10px] px-1 text-sm transition-all duration-200 pointer-events-none bg-surface text-text-secondary peer-focus:text-primary"
      >
        Examples
      </label>
    </div>
  );
}