import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import {
  AUTH_EXPIRES_STORAGE_KEY,
  AUTH_TOKEN_STORAGE_KEY,
  AUTH_USER_STORAGE_KEY,
} from "@/constants/api";

type AuthUser = {
  id: number;
  name: string;
  email: string;
  is_admin?: boolean;
};

type AuthState = {
  token: string | null;
  tokenExpiresAt: string | null;
  user: AuthUser | null;
};

type LoginPayload = {
  access_token: string;
  expires_in?: number;
  user: AuthUser;
};

function readStorage(key: string) {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(key);
}

function readStoredUser() {
  const rawUser = readStorage(AUTH_USER_STORAGE_KEY);
  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser) as AuthUser;
  } catch {
    return null;
  }
}

const initialState: AuthState = {
  token: readStorage(AUTH_TOKEN_STORAGE_KEY),
  tokenExpiresAt: readStorage(AUTH_EXPIRES_STORAGE_KEY),
  user: readStoredUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<LoginPayload>) {
      const expiresAt = action.payload.expires_in
        ? new Date(Date.now() + action.payload.expires_in * 1000).toISOString()
        : null;

      state.token = action.payload.access_token;
      state.tokenExpiresAt = expiresAt;
      state.user = action.payload.user;

      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          AUTH_TOKEN_STORAGE_KEY,
          action.payload.access_token,
        );
        window.localStorage.setItem(
          AUTH_USER_STORAGE_KEY,
          JSON.stringify(action.payload.user),
        );
        if (expiresAt) {
          window.localStorage.setItem(AUTH_EXPIRES_STORAGE_KEY, expiresAt);
        } else {
          window.localStorage.removeItem(AUTH_EXPIRES_STORAGE_KEY);
        }
      }
    },
    clearCredentials(state) {
      state.token = null;
      state.tokenExpiresAt = null;
      state.user = null;

      if (typeof window !== "undefined") {
        window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
        window.localStorage.removeItem(AUTH_USER_STORAGE_KEY);
        window.localStorage.removeItem(AUTH_EXPIRES_STORAGE_KEY);
      }
    },
  },
});

export const { clearCredentials, setCredentials } = authSlice.actions;
export default authSlice.reducer;
