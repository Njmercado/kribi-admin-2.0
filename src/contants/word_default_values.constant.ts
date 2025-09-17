import { WordDTO, WordType } from "@/models";

export const WORD_DEFAULT_VALUES: WordDTO = {
  _id: -1,
  word: 'default word',
  type: WordType.NONE,
  translations: ['default translation'],
  definitions: ['default definition'],
  examples: ['default example'],
}
