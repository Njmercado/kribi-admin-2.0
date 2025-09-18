export interface WordTitleProps {
  word: string;
  readOnly?: boolean;
  onChange?: (newWord: string) => void;
}

export function WordTitle({ word, readOnly, onChange }: WordTitleProps) {
  return readOnly ? (
    <h2 className="text-xl font-bold">{word}</h2>
  ) : (
    <input className="text-xl font-bold" type="text" defaultValue={word} onChange={e => onChange?.(e.target.value)} />
  )
}
