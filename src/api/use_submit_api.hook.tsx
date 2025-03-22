'use client'

import CustomFetch from "./custom_fetch";
import { useState } from "react";
import { SpanishWordDTO, WordDTO } from "@/models";

export default function useSubmitAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState<object>();

  const customFetch = new CustomFetch();

  async function putWord(word: WordDTO | SpanishWordDTO) {
    try {
      setIsLoading(true);

      const result = await customFetch.put('putWord', word);

      setResponse(result);
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
    putWord,
  }
}
