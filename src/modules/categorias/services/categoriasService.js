import api from '@/api/api'

// Obtener categorías
export const getCategorias = async () => {
  const res = await api.get('/categorias')
  return res.data.data
}

// Crear categoría
export const createCategoria = async (data) => {
  const res = await api.post('/categorias', data)
  return res.data.data
}

// Actualizar categoría
export const updateCategoria = async (id, data) => {
  const res = await api.put(`/categorias/${id}`, data)
  return res.data.data
}

// Eliminar categoría
export const deleteCategoria = async (id) => {
  const res = await api.delete(`/categorias/${id}`)
  return res.data.data
}

// Cambiar estado
export const toggleCategoriaEstado = async (id) => {
  const res = await api.post(`/categorias/${id}/toggle-estado`)
  return res.data.data
}