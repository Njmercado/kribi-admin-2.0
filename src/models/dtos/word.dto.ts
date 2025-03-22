import IWord from "../interfaces/word.interface";

export default interface WordDTO extends IWord {
  _id: number | string | null;
}