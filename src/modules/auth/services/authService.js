import api from '@/api/api'

export const loginRequest = async (data) => {

  const response = await api.post(
    '/login',
    data)
  return response.data
}
