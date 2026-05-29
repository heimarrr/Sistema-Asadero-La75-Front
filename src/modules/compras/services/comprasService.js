import api from '@/api/api'

// OBTENER COMPRAS

export const getCompras = async () => {
  const res = await api.get('/compras')

  return res.data.data
}

// OBTENER UNA COMPRA

export const getCompra = async (id) => {
  const res = await api.get(`/compras/${id}`)

  return res.data.data
}

// CREAR COMPRA

export const createCompra = async (data) => {
  const res = await api.post('/compras', data)

  return res.data.data
}

// ELIMINAR COMPRA

export const deleteCompra = async (id) => {
  const res = await api.delete(`/compras/${id}`)

  return res.data.data
}
