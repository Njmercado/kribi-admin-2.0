'use client';

import CustomFetch from "./custom_fetch";
import { PREFIXES } from "@/contants";
import { AuthResponse, FetchResponse, Token } from "@/models";

const customFetch = new CustomFetch(PREFIXES.AUTH);

export function logIn(formData: FormData) {
  return customFetch.post<Token>({ path: '/login', body: formData, options: { contentType: 'form' } });
}

export function logOut() {
  return customFetch.post({ path: '/logout' });
}

export function checkAuth(): Promise<FetchResponse<AuthResponse>> {
  return customFetch.get<AuthResponse>({ path: '/me' });
}
