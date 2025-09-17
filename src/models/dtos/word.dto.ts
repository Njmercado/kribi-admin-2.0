import { IWord } from "../interfaces/word.interface";

export interface WordDTO extends IWord {
  _id: number | string | null;
}