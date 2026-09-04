import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { AUTH_TOKEN_STORAGE_KEY } from "@/constants/api";
import { API_BASE_URL } from "@/constants/endpoints";
import { clearCredentials } from "@/redux/slices/authSlice";
import type { RootState } from "@/redux/store";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const stateToken = (getState() as RootState).auth.token;
    const storageToken =
      typeof window === "undefined"
        ? null
        : window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    const token = stateToken ?? storageToken;

    headers.set("Accept", "application/json");
    if (token) headers.set("Authorization", `Bearer ${token}`);

    return headers;
  },
});

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    api.dispatch(clearCredentials());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Profile", "Project", "ProjectDetailSection", "ContactMessage"],
  endpoints: () => ({}),
});
