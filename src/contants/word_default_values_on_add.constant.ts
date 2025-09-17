import { WordDTO, WordType } from "@/models";

export const WORD_DEFAULT_VALUES_ON_ADD: WordDTO = {
  _id: null,
  word: 'new word value',
  type: WordType.VERB,
  translations: ['new word translation'],
  definitions: ['new word definition'],
  examples: ['new word example'],
}
