import axiosServices from 'utils/axios'
import { endpoints } from './users';

const Profile = {
  editProfile: async (userId, payload) => {
    try {
      const response = await axiosServices.put(`/${endpoints.key}/${userId}`, payload)
      return response
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  }
}

export default {
  Profile
}
