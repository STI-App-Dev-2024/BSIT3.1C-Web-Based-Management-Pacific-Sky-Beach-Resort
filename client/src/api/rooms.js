import axiosServices, { fetcher } from 'utils/axios'
import { useMemo } from "react";
import useSWR from "swr";

const options = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  onSuccess: (data, key, config) => data
};

const endpoints = {
  key: `${import.meta.env.VITE_API_KEY_}/${import.meta.env.VITE_API_VER}/rooms`,
  createRoom: `${import.meta.env.VITE_API_KEY_}/${import.meta.env.VITE_API_VER}/rooms/create-room`,
};

export const useGetAllRooms = () => {
  const { data, isLoading, error, mutate } = useSWR(`/${endpoints.key}`, fetcher, options)

  const memoizedValue = useMemo(
    () => ({
      rooms: data,
      roomsLoading: isLoading,
      mutate,
      error
    }),

    [data, error, isLoading, mutate]
  );

  return memoizedValue
}

export const useGetSingleRoom = (roomId) => {
  const { data, isLoading, error, mutate } = useSWR(roomId ? `/${endpoints.key}/${roomId}` : null, fetcher, options)

  const memoizedValue = useMemo(
    () => ({
      room: data,
      roomLoading: isLoading,
      mutate,
      error
    }),

    [data, error, isLoading, mutate]
  );

  return memoizedValue
}

const Rooms = {
  createRoom: async (payload) => {
    try {
      await axiosServices.post(`/${endpoints.createRoom}`, payload)
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  editRoom: async (roomId, payload) => {
    try {
      await axiosServices.put(`/${endpoints.key}/${roomId}`, payload)
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  deleteRoom: async (roomId) => {
    try {
      await axiosServices.delete(`/${endpoints.key}/${roomId}`)
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  }
}

export default {
  Rooms
}