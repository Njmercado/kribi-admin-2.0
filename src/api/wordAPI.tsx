'use client'

import CustomFetch from "./custom_fetch";
import { WordDTO, IWord, WordSearchDTO } from "@/models";
import { PREFIXES, API_ENDPOINTS } from "@/contants";

const customFetch = new CustomFetch(PREFIXES.WORD);

export function search(word: string, limit: number = 10, page: number = 1) {
  const encodedWord = encodeURIComponent(word);
  return customFetch.get<WordSearchDTO>({ path: `${API_ENDPOINTS.WORD.SEARCH}?word=${encodedWord}&limit=${limit}&page=${page}` });
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
