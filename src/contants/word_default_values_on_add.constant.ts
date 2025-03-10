import { WordDTO } from "@/models";

const WORD_DEFAULT_VALUES_ON_ADD: WordDTO = {
  id: null,
  word: 'new word value',
  type: 'new word type',
  translations: ['new word translation'],
  definitions: ['new word definition'],
  examples: ['new word example'],
}

export default WORD_DEFAULT_VALUES_ON_ADD;