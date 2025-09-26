import { FetchResponse } from "@/models";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useRequest<T>(functionToCall: (...args: any[]) => Promise<FetchResponse<T>>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState<T | null | undefined>();

  // TODO: fix this any error
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function request(...params: any[]) {
    try {
      setIsError(false);
      const result = await functionToCall(...params);

      // TODO: Standardize error handling in the API using constants instead of hardcoding status codes
      if ( ![200, 201, 202, 204].includes(result.status) ) {
        // TODO: Design a better error handling mechanism, maybe a toast notification system
        alert(result.statusText || 'Error');
        throw new Error(result.statusText || 'Error');
      } 
      setResponse(() => result.data);
    } catch (error) {
      setError(JSON.stringify(error));
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    error,
    response,
    request,
  };
};