import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import '@/styles/global.css'
import '../styles/nuevaVenta.css'

import { getProductos } from '@/modules/productos/services/productosService'
import { createVenta } from '../services/ventasService'

import VentaHeader from '../components/nueva-venta/VentaHeader'
import AgregarProductoForm from '../components/nueva-venta/AgregarProductoForm'
import CarritoTable from '../components/nueva-venta/CarritoTable'
import ConfirmarVentaModal from '../components/nueva-venta/ConfirmarVentaModal'

function NuevaVenta() {
  const [productos, setProductos] = useState([])

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    productos: [],
  })

  const [detalle, setDetalle] = useState({
    id_producto: '',
    cantidad: 1,
  })

  const [busqueda, setBusqueda] = useState('')

  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    loadProductos()
  }, [])

  const loadProductos = async () => {
    try {
      const data = await getProductos()

      setProductos(data || [])
    } catch {
      toast.error('Error al cargar productos')
    }
  }

  const productoActual = productos.find(
    (p) => p.id_producto == detalle.id_producto,
  )

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  )

  const agregarProducto = () => {
    if (!detalle.id_producto) {
      return toast.error('Selecciona un producto')
    }

    if (!productoActual) {
      return toast.error('Selecciona un producto válido')
    }

    const cantidad = Number(detalle.cantidad)

    if (cantidad < 1) {
      return toast.error('Cantidad inválida')
    }

    if (cantidad > productoActual.stock_actual) {
      return toast.error(
        `Stock disponible: ${productoActual.stock_actual}`,
      )
    }

    const productoExiste = form.productos.find(
      (p) => p.id_producto == detalle.id_producto,
    )

    if (productoExiste) {
      const nuevaCantidad = productoExiste.cantidad + cantidad

      if (nuevaCantidad > productoActual.stock_actual) {
        return toast.error('Stock insuficiente')
      }

      const nuevosProductos = form.productos.map((p) =>
        p.id_producto == detalle.id_producto
          ? {
              ...p,
              cantidad: nuevaCantidad,
              subtotal: p.precio_unitario * nuevaCantidad,
            }
          : p,
      )

      setForm({
        ...form,
        productos: nuevosProductos,
      })
    } else {
      const nuevoProducto = {
        id_producto: productoActual.id_producto,
        nombre: productoActual.nombre,
        precio_unitario: Number(productoActual.precio_venta),
        cantidad,
        subtotal:
          Number(productoActual.precio_venta) * cantidad,
        stock_actual: productoActual.stock_actual,
      }

      setForm({
        ...form,
        productos: [...form.productos, nuevoProducto],
      })
    }

    setDetalle({
      id_producto: '',
      cantidad: 1,
    })

    setBusqueda('')
  }

  const eliminarProducto = (id) => {
    setForm({
      ...form,
      productos: form.productos.filter(
        (p) => p.id_producto !== id,
      ),
    })
  }

  const cambiarCantidad = (id, valor) => {
    const cantidad = Number(valor)

    if (cantidad < 1) return

    const item = form.productos.find(
      (p) => p.id_producto === id,
    )

    if (!item) return

    if (cantidad > item.stock_actual) {
      return toast.error('Stock insuficiente')
    }

    const nuevosProductos = form.productos.map((p) =>
      p.id_producto === id
        ? {
            ...p,
            cantidad,
            subtotal: p.precio_unitario * cantidad,
          }
        : p,
    )

    setForm({
      ...form,
      productos: nuevosProductos,
    })
  }

  const total = form.productos.reduce(
    (acc, item) => acc + Number(item.subtotal),
    0,
  )

  const confirmarVenta = async () => {
    if (form.productos.length === 0) {
      return toast.error('Agrega productos')
    }

    try {
      setLoading(true)

      await createVenta({
        productos: form.productos.map((p) => ({
          id_producto: p.id_producto,
          cantidad: p.cantidad,
        })),
      })

      toast.success('Venta registrada correctamente')

      setForm({
        productos: [],
      })

      setDetalle({
        id_producto: '',
        cantidad: 1,
      })

      setBusqueda('')
      setModalOpen(false)

      await loadProductos()
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          'Error al registrar venta',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="vt">
      <VentaHeader />

      <div className="vt-grid">
        <AgregarProductoForm
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          detalle={detalle}
          setDetalle={setDetalle}
          productosFiltrados={productosFiltrados}
          productoActual={productoActual}
          agregarProducto={agregarProducto}
        />

        <CarritoTable
          carrito={form.productos}
          total={total}
          onCambiarCantidad={cambiarCantidad}
          onQuitar={eliminarProducto}
          onConfirmar={() => setModalOpen(true)}
        />
      </div>

      <ConfirmarVentaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        carrito={form.productos}
        total={total}
        loading={loading}
        onConfirmar={confirmarVenta}
      />
    </div>
  )
}

export default NuevaVenta