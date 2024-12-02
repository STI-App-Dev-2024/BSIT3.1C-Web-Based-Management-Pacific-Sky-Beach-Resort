import { useMemo } from "react";
import useSWR from "swr";
import axiosServices from 'utils/axios'

const endpoints = {
  key: `${import.meta.env.VITE_API_KEY_}/${import.meta.env.VITE_API_VER}/bookings`
}

const BookRooms = {
  bookRooms: async (payload) => {
    try {
      const response = await axiosServices.post(`/${endpoints.key}/create-booking-with-new-customer`, payload)
      return response.data
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  }
}

export default {
  BookRooms
}