export enum WordType {
  NOUN = 'NOUN',
  VERB = 'VERB',
  ADJECTIVE = 'ADJECTIVE',
  ADVERB = 'ADVERB',
  PREPOSITION = 'PREPOSITION',
  CONJUNCTION = 'CONJUNCTION',
  INTERJECTION = 'INTERJECTION',
  ARTICLE = 'ARTICLE',
  NONE = 'NONE',
}

/**
 * Interface representing a word with its definitions, examples, type, translations, and optional language.
 */
export interface IWord {
  // add documentation for each property
  word: string;
  definitions: string[];
  // examples of the word in use
  examples: string[];
  // what kind of word it is
  type: WordType;
  // set of translations to the other available language, for example if the word is in Spanish, the translations will be in Palenque
  translations: string[];
  // word language
  language?: 'spanish' | 'palenque'
}