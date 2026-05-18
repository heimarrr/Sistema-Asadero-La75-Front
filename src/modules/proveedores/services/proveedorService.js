import api from '@/api/api'

// Obtener proveedores
export const getProveedores = async () => {
  const res = await api.get('/proveedores')
  return res.data.data
}

// Crear proveedor
export const createProveedor = async (data) => {
  const res = await api.post('/proveedores', data)
  return res.data
}

// Actualizar proveedor
export const updateProveedor = async (id, data) => {
  const res = await api.put(
    `/proveedores/${id}`,
    data
  )
  return res.data
}

// Eliminar proveedor
export const deleteProveedor = async (id) => {
  const res = await api.delete(
    `/proveedores/${id}`
  )
  return res.data
}

// Cambiar estado
export const toggleProveedorEstado = async (
  id
) => {
  const res = await api.post(
    `/proveedores/${id}/toggle-estado`
  )
  return res.data
}