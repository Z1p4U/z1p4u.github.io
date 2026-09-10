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
  isHydrated: boolean;
  token: string | null;
  tokenExpiresAt: string | null;
  user: AuthUser | null;
};

type LoginPayload = {
  access_token: string;
  expires_in?: number;
  user: AuthUser;
};

type HydrateAuthPayload = {
  token: string | null;
  tokenExpiresAt: string | null;
  user: AuthUser | null;
};

const initialState: AuthState = {
  isHydrated: false,
  token: null,
  tokenExpiresAt: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateCredentials(state, action: PayloadAction<HydrateAuthPayload>) {
      state.isHydrated = true;
      state.token = action.payload.token;
      state.tokenExpiresAt = action.payload.tokenExpiresAt;
      state.user = action.payload.user;
    },
    setCredentials(state, action: PayloadAction<LoginPayload>) {
      const expiresAt = action.payload.expires_in
        ? new Date(Date.now() + action.payload.expires_in * 1000).toISOString()
        : null;

      state.isHydrated = true;
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
      state.isHydrated = true;
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

export const { clearCredentials, hydrateCredentials, setCredentials } =
  authSlice.actions;
export default authSlice.reducer;
