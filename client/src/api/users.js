import { useMemo } from "react";
import useSWR from "swr";
import { fetcher } from 'utils/axios'

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
