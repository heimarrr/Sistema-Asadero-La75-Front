import api from '@/api/api'

export const getUsuarios = async (page) => {

  const res = await api.get(`/usuarios?page=${page}`)

  return res.data
}

export const createUsuario = async (data) => {

  return await api.post('/usuarios',data)
}

export const updateUsuario = async (id, data) => {

  return await api.put(`/usuarios/${id}`,data)
}

export const deleteUsuario = async (id) => {

  return await api.delete(`/usuarios/${id}`)
}

export const toggleUsuarioEstado = async (id) => {

  return await api.post(
    `/usuarios/${id}/toggle-estado`
  )
}