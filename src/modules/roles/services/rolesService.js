import api from '@/api/api'

// Obtener roles
export const getRoles = async () => {
  const res = await api.get('/roles')
  return res.data
}

// Crear rol
export const createRol = async (data) => {
  const res = await api.post('/roles', data)
  return res.data.data
}

// Actualizar rol
export const updateRol = async (id, data) => {
  const res = await api.put(`/roles/${id}`, data)
  return res.data.data
}

// Eliminar rol
export const deleteRol = async (id) => {
  const res = await api.delete(`/roles/${id}`)
  return res.data.data
}

// Cambiar estado
export const toggleRolEstado = async (id) => {
  const res = await api.post(`/roles/${id}/toggle-estado`)
  return res.data.data
}