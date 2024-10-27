import { useMemo } from "react";
import useSWR from "swr";
import axiosServices, { fetcher } from 'utils/axios'

export const endpoints = {
  key: `${import.meta.env.VITE_API_KEY_}/${import.meta.env.VITE_API_VER}/users`,
};

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
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
