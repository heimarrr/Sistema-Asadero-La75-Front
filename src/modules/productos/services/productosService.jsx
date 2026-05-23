import api from '@/api/api'

// Obtener productos
export const getProductos = async () => {
  const res = await api.get('/productos')
  return res.data.data
}

// Crear producto
export const createProducto = async (data) => {
  const res = await api.post('/productos', data)
  return res.data.data
}

// Actualizar producto
export const updateProducto = async (id, data) => {
  const res = await api.put(`/productos/${id}`, data)
  return res.data.data
}

// Eliminar producto
export const deleteProducto = async (id) => {
  const res = await api.delete(`/productos/${id}`)
  return res.data.data
}

// Cambiar estado
export const toggleProductoEstado = async (id) => {
  const res = await api.post(`/productos/${id}/toggle-estado`)
  return res.data.data
}