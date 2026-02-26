import { TextField } from '@/components/atom/TextField';

export interface WordTitleProps {
  word?: string;
  readOnly?: boolean;
  onChange?: (newWord: string) => void;
}

export function WordTitle({ word, readOnly, onChange }: WordTitleProps) {
  return readOnly ? (
    <h2 className="text-2xl font-bold text-text-primary capitalize mb-2">{word}</h2>
  ) : (
    <TextField
      label="Word"
      defaultValue={word}
      onChange={e => onChange?.(e.target.value)}
      fullWidth
    />
  );
}
