import { WORD_TYPE_SPANISH, WordType as WordTypeEnum } from '@/models';
import { Chip } from '@/components/atom/Chip';

export interface WordTypeProps {
  type?: string;
  readOnly?: boolean;
  onChange?: (newType: WordTypeEnum) => void;
}

export function WordType({ type, readOnly, onChange }: WordTypeProps) {
  return readOnly ? (
    <div className="mb-4">
      <Chip label={type || 'UNKNOWN'} color="primary" variant="outlined" />
    </div>
  ) : (
    <div className="relative flex flex-col w-full mt-4 mb-2">
      <select
        className="peer w-full h-14 text-text-primary px-4 pt-4 pb-1 border-2 border-gray-300 focus:border-primary rounded outline-none transition-colors duration-200 appearance-none bg-surface"
        name="wordType"
        id="wordType"
        value={type}
        onChange={e => onChange?.(e.target.value as WordTypeEnum)}
      >
        {
          Object.keys(WORD_TYPE_SPANISH).map((wordType: string) => (
            <option key={wordType} value={WordTypeEnum[WORD_TYPE_SPANISH[wordType]]}>
              {wordType}
            </option>
          ))
        }
      </select>
      <label
        htmlFor="wordType"
        className="absolute left-3 top-[-10px] px-1 text-sm transition-all duration-200 pointer-events-none bg-surface text-text-secondary peer-focus:text-primary"
      >
        Type
      </label>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}
