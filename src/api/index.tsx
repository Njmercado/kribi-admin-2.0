'use client'

import CustomFetch from "./custom_fetch";
import { useState } from "react";

export function useAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState<object>();

  const customFetch = new CustomFetch();

  async function submit<T>(functionName: string, body?: T) {
    try {
      setIsLoading(true);

      let result;
      switch (functionName) {
        case 'PUT_WORD':
          result = await customFetch.put('putWord', body);
          break;
        default:
          throw new Error('Function not found');
      }

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
    submit,
  }
}
