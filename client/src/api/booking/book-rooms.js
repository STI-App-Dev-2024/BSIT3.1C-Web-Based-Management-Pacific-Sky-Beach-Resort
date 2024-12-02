import { useMemo } from "react";
import useSWR from "swr";
import axiosServices, { fetcher } from 'utils/axios'

const endpoints = {
  key: `${import.meta.env.VITE_API_KEY_}/${import.meta.env.VITE_API_VER}/bookings`,
  reservationStatus: `${import.meta.env.VITE_API_KEY_}/${import.meta.env.VITE_API_VER}/bookings/update-reservation-status`
}

const options = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  onSuccess: (data, key, config) => data
};

export const useGetAllBookings = () => {
  const { data, isLoading, error, mutate } = useSWR(`/${endpoints.key}`, fetcher, options)

  const memoizedValue = useMemo(
    () => ({
      roomBookings: data,
      isLoading,
      mutate,
      error
    }),

    [data, error, isLoading, mutate]
  );

  return memoizedValue
}

export const useGetSingleBookingById = (bookingId) => {
  const { data, isLoading, error, mutate } = useSWR(bookingId ? `/${endpoints.key}/${bookingId}` : null, fetcher, options)

  const memoizedValue = useMemo(
    () => ({
      bookData: data,
      isLoading,
      mutate,
      error
    }),

    [data, error, isLoading, mutate]
  );

  return memoizedValue
}

const BookRooms = {
  bookRooms: async (payload) => {
    try {
      const response = await axiosServices.post(`/${endpoints.key}/create-booking-with-new-customer`, payload)
      return response.data
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  updateReservationStatus: async (bookingId, isReserved) => {
    try {
      const response = await axiosServices.put(`/${endpoints.reservationStatus}/${bookingId}`, { isReserved })
      return response.data
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  }
}

export default {
  BookRooms
}