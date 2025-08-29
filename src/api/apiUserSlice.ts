import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

export interface User {
  name: string;
  email: string;
  dob: string;
  phone: string;
  location: string;
  avatar: string;
  id: number;
}

// Wrap baseQuery with retry
const baseQueryWithRetry = retry(
  fetchBaseQuery({
    baseUrl: "https://687124747ca4d06b34b97d3d.mockapi.io/",
  }),
  { maxRetries: 3 }
);

export const apiUserSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    // for the get all Users
    getUsers: builder.query<User[], void>({
      query: () => "/api/userId",
      providesTags: ["Users"],
    }),

    // For the Get User by ID
    getUserById: builder.query<User[], number>({
      query: (id) => `/api/userId/${id}`,
      providesTags: (_results, _error, id) => [{ type: "Users", id }],
    }),

    // For Create a new User
    createUser: builder.mutation<User[], Partial<User>>({
      query: (newPost) => ({
        url: "/api/userId",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useCreateUserMutation } =
  apiUserSlice;
