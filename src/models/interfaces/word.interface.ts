export enum WordType {
  NOUN = 'noun',
  VERB = 'verb',
  ADJECTIVE = 'adjective',
  ADVERB = 'adverb',
  PREPOSITION = 'preposition',
  CONJUNCTION = 'conjunction',
  INTERJECTION = 'interjection',
  ARTICLE = 'article',
  NONE = 'none',
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