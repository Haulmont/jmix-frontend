import { FetchOptions } from "@haulmont/jmix-rest";
import { useCallback } from "react";
import { useMainStore } from "./MainStore";

export const useGetFile = () => {
  const mainStore = useMainStore();
  const token = mainStore.authToken;
  const graphqlEndpoint = mainStore.graphqlEndpoint;

  return useCallback((fileRef: string, fetchOptions?: FetchOptions): Promise<Blob> => {
    const headers: HeadersInit = {};
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
  
    return fetch(
      `${graphqlEndpoint}/files?fileRef=${fileRef}`,
      {
        headers,
        handleAs: 'blob',
        ...fetchOptions
      }
    ).then(resp => {
      if (resp.status !== 200) {
        throw new Error();
      }
  
      return resp.blob();
    });
  }, [token])
}