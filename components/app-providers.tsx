"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import {
  AUTH_EXPIRES_STORAGE_KEY,
  AUTH_TOKEN_STORAGE_KEY,
  AUTH_USER_STORAGE_KEY,
} from "@/constants/api";
import { Toaster } from "@/components/ui/sonner";
import { hydrateCredentials } from "@/redux/slices/authSlice";
import { store } from "@/redux/store";

function readStoredUser() {
  const rawUser = window.localStorage.getItem(AUTH_USER_STORAGE_KEY);
  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
}

function hydrateStoredAuth() {
  const token = window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  const tokenExpiresAt = window.localStorage.getItem(AUTH_EXPIRES_STORAGE_KEY);

  if (tokenExpiresAt && new Date(tokenExpiresAt).getTime() <= Date.now()) {
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    window.localStorage.removeItem(AUTH_USER_STORAGE_KEY);
    window.localStorage.removeItem(AUTH_EXPIRES_STORAGE_KEY);

    return {
      token: null,
      tokenExpiresAt: null,
      user: null,
    };
  }

  return {
    token,
    tokenExpiresAt,
    user: readStoredUser(),
  };
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(hydrateCredentials(hydrateStoredAuth()));
  }, []);

  return (
    <Provider store={store}>
      {children}
      <Toaster />
    </Provider>
  );
}
