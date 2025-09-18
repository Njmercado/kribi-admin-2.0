import { WordType as WordTypeEnum } from '@/models';

export interface WordTypeProps {
  type?: string;
  readOnly?: boolean;
  onChange?: (newType: WordTypeEnum ) => void;
}

export function WordType({ type, readOnly, onChange }: WordTypeProps) {
  return readOnly ?
    <p className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
      {type}
    </p>
    : (
      <p>
        <select name="wordType" id="wordType" value={type} onChange={e => onChange?.(e.target.value as WordTypeEnum)}>
          {Object.values(WordTypeEnum).map((wordType) => (
            <option key={wordType} value={wordType}>
              {wordType}
            </option>
          ))}
        </select>
      </p>
    );
}
