import api from '@/api/api'

export const getVentas = async () => {
  const res = await api.get('/ventas')
  return res.data.data
}


// OBTENER UNA VENTA

export const getVenta = async (id) => {
  const res = await api.get(`/ventas/${id}`)

  return res.data.data
}

// CREAR VENTA

export const createVenta = async (data) => {
  const res = await api.post('/ventas', data)

  return res.data.data
}

// ELIMINAR VENTA

export const deleteVenta = async (id) => {
  const res = await api.delete(`/ventas/${id}`)

  return res.data.data
}