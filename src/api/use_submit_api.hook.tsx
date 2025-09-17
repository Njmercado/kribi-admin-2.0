'use client'

import CustomFetch from "./custom_fetch";
import { useState } from "react";
import { WordDTO } from "@/models";
import { PREFIXES } from "@/contants";

export default function useSubmitAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState<object>();

  const customFetch = new CustomFetch(PREFIXES.WORD);

  async function putWord(word: WordDTO) {
    try {
      setIsLoading(true);

      const result = await customFetch.put({ body: word });

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
