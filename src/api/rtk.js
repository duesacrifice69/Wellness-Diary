import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalStorage } from "../utils";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = LocalStorage.get("token");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  reducerPath: "wellnessDiaryApi",
  tagTypes: ["Articles", "BloodPressure", "BloodSugar", "BMI", "FBC"],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => "Articles",
      providesTags: ["Articles"],
    }),
    getArticlesByCategory: builder.query({
      query: (categoryId) => `Articles/ByCategory/${categoryId}`,
      providesTags: ["Articles"],
    }),
    getArticleById: builder.query({
      query: (id) => `Articles/${id}`,
      providesTags: ["Articles"],
    }),
    editArticle: builder.mutation({
      query: ({ articleId, body }) => ({
        url: `Articles/${articleId}`,
        method: "PUT",
        body: body,
        formData: true,
      }),
      invalidatesTags: ["Articles"],
    }),
    createArticle: builder.mutation({
      query: (body) => ({
        url: `Articles`,
        method: "POST",
        body,
        formData: true,
      }),
      invalidatesTags: ["Articles"],
    }),
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `Articles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Articles"],
    }),
    getBloodPressures: builder.query({
      query: (userId) => `BloodPressures/${userId}/bloodPressuresWithCategory`,
      providesTags: ["BloodPressure"],
    }),
    checkBloodPressure: builder.mutation({
      query: ({ readingId, ...body }) => ({
        url: readingId ? `BloodPressures/${readingId}` : "BloodPressures",
        method: readingId ? "PUT" : "POST",
        body: { readingId, ...body },
      }),
      invalidatesTags: ["BloodPressure"],
    }),
    getBloodSugars: builder.query({
      query: (userId) => `BloodSugars/${userId}/bloodSugarsWithCategory`,
      providesTags: ["BloodSugar"],
    }),
    checkBloodSugar: builder.mutation({
      query: ({ readingId, ...body }) => ({
        url: readingId ? `BloodSugars/${readingId}` : "BloodSugars",
        method: readingId ? "PUT" : "POST",
        body: { readingId, ...body },
      }),
      invalidatesTags: ["BloodSugar"],
    }),
    getBmi: builder.query({
      query: (userId) => `Bmis/${userId}/bmiWithCategory`,
      providesTags: ["BMI"],
    }),
    checkBmi: builder.mutation({
      query: ({ readingId, ...body }) => ({
        url: readingId ? `Bmis/${readingId}` : "Bmis",
        method: readingId ? "PUT" : "POST",
        body: { readingId, ...body },
      }),
      invalidatesTags: ["BMI"],
    }),
    getFbc: builder.query({
      query: (userId) => `Fbcs/${userId}/fbc`,
      providesTags: ["FBC"],
    }),
    checkFbcs: builder.mutation({
      query: ({ readingId, ...body }) => ({
        url: readingId ? `Fbcs/${readingId}` : "Fbcs",
        method: readingId ? "PUT" : "POST",
        body: { readingId, ...body },
      }),
      invalidatesTags: ["FBC"],
    }),
    getCholesterol: builder.query({
      query: (userId) => `Cholesterols/${userId}/cholesterol`,
      providesTags: ["Cholesterol"],
    }),
    checkCholesterols: builder.mutation({
      query: ({ readingId, ...body }) => ({
        url: readingId ? `Cholesterols/${readingId}` : "Cholesterols",
        method: readingId ? "PUT" : "POST",
        body: { readingId, ...body },
      }),
      invalidatesTags: ["Cholesterol"],
    }),
  }),
});

export const {
  useGetCholesterolQuery,
  useCheckCholesterolsMutation,
  useGetBloodSugarsQuery,
  useCheckBloodSugarMutation,
  useGetBmiQuery,
  useCheckBmiMutation,
  useGetFbcQuery,
  useCheckFbcsMutation,
  useCheckBloodPressureMutation,
  useGetBloodPressuresQuery,
  useDeleteArticleMutation,
  useCreateArticleMutation,
  useEditArticleMutation,
  useGetArticleByIdQuery,
  useGetArticlesByCategoryQuery,
  useGetArticlesQuery,
} = api;
