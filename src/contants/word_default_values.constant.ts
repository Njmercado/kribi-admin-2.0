import { WordDTO } from "@/models";

const WORD_DEFAULT_VALUES: WordDTO = {
  id: -1,
  word: 'default word',
  type: 'default type',
  translations: ['default translation'],
  definitions: ['default definition'],
  examples: ['default example'],
}

export default WORD_DEFAULT_VALUES;