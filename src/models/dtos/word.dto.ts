import { IWord } from "../interfaces/word.interface";

export interface WordDTO extends IWord {
  id: number | string | null;
}