'use client'

import CustomFetch from "./custom_fetch";
import { WordDTO, IWord } from "@/models";
import { PREFIXES, API_ENDPOINTS } from "@/contants";

const customFetch = new CustomFetch(PREFIXES.WORD);

export function search(word: string) {
  const encodedWord = encodeURIComponent(word);
  return customFetch.get<Array<WordDTO>>({ path: `${API_ENDPOINTS.WORD.SEARCH}?word=${encodedWord}` });
}

export function update(word: WordDTO) {
  return customFetch.put<WordDTO>({ path: `/${word.id}`, body: word });
}

export function erase(id: string) {
  return customFetch.del({ path: `/${id}` });
}

export function create(word: IWord) {
  return customFetch.post<WordDTO>({ path: '/', body: word });
}
