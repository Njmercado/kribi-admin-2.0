'use client'

import { API_ENDPOINTS } from "@/contants";
import CustomFetch from "./custom_fetch";
import { useState } from "react";
import { SpanishWordDTO, WordDTO } from "@/models";

export default function useGetAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState<Array<WordDTO>>();

  const customFetch = new CustomFetch();

  async function getWords(word: string) {
    try {
      setIsLoading(true);

      const ENDPOINT = `/${API_ENDPOINTS.GET_WORD}?words=${word}`;
      const result = await customFetch.get<SpanishWordDTO>(ENDPOINT);

      const mappedResult: Array<WordDTO> = result.map((word: SpanishWordDTO) => ({
        _id: word._id,
        word: word.palabra,
        definitions: word.definicion,
        examples: word.ejemplos,
        translations: word.traducciones ?? [],
        type: word.tipo ?? '',
      }));

      setResponse(mappedResult);
    } catch (error) {
      setError(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    error,
    response,
    getWords,
  }
}