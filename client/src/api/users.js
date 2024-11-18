import { useMemo } from "react";
import useSWR from "swr";
import axiosServices, { fetcher } from 'utils/axios'

export const endpoints = {
  key: `${import.meta.env.VITE_API_KEY_}/${import.meta.env.VITE_API_VER}/users`,
  changePassword: `${import.meta.env.VITE_API_KEY_}/${import.meta.env.VITE_API_VER}/users/change-password`
};

const options = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  onSuccess: (data, key, config) => data
};

export const useGetAllUsers = () => {
  const { data, isLoading, error, mutate } = useSWR(`/${endpoints.key}`, fetcher, options)

  const memoizedValue = useMemo(
    () => ({
      users: data,
      isLoading,
      mutate,
      error
    }),

    [data, error, isLoading, mutate]
  );

  return memoizedValue
}

export const useGetSingleUser = (userId) => {
  const { data, isLoading, error, mutate } = useSWR(
    userId ? `/${endpoints.key}/${userId}` : null,
    fetcher,
    options
  );

  const memoizedValue = useMemo(
    () => ({
      user: data,
      isLoading,
      mutate,
      error
    }),

    [data, error, isLoading, mutate]
  );

  return memoizedValue
}

const Users = {
  addUser: async (payload) => {
    try {
      const response = await axiosServices.post(`/${endpoints.key}/register`, payload)
      return response.data
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  deleteUser: async (userId) => {
    try {
      const response = await axiosServices.delete(`/${endpoints.key}/${userId}`)
      return response
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  }
}

export default {
  Users
}
