import { IWord } from "../interfaces/word.interface";

export interface WordDTO extends IWord {
  id: number | string | null;
}

export interface WordSearchDTO {
  words: Array<WordDTO>;
  has_next_page: boolean;
}