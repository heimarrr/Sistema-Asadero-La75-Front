import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import '@/styles/global.css'
import '../styles/nuevaCompra.css'
import { getProveedores } from '@/modules/proveedores/services/proveedorService'
import { getProductos } from '@/modules/productos/services/productosService'
import { createCompra } from '../services/comprasService'
import CompraHeader from '../components/nueva-compra/CompraHeader'
import CompraInfoForm from '../components/nueva-compra/CompraInfoForm'
import AgregarProductoForm from '../components/nueva-compra/AgregarProductoForm'
import CompraProductosTable from '../components/nueva-compra/CompraProductosTable'
import CompraResumen from '../components/nueva-compra/CompraResumen'

function NuevaCompra() {
  const navigate = useNavigate()

  const [proveedores, setProveedores] = useState([])

  const [productos, setProductos] = useState([])

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    id_proveedor: '',
    fecha: new Date().toISOString().split('T')[0],

    total_compra: 0,

    productos: [],
  })

  const [detalle, setDetalle] = useState({
    id_producto: '',
    cantidad: 1,
    precio_unitario: '',
  })

  useEffect(() => {
    loadProveedores()

    loadProductos()
  }, [])

  const loadProveedores = async () => {
    try {
      const data = await getProveedores()

      setProveedores(data)
    } catch {
      toast.error('Error cargando proveedores')
    }
  }

  const loadProductos = async () => {
    try {
      const data = await getProductos()

      setProductos(data || [])
    } catch {
      toast.error('Error cargando productos')
    }
  }

  const agregarProducto = () => {
    if (!detalle.id_producto || !detalle.cantidad || !detalle.precio_unitario) {
      return toast.error('Completa los datos')
    }

    const productoExiste = form.productos.find(
      (p) => p.id_producto == detalle.id_producto,
    )

    if (productoExiste) {
      return toast.error('El producto ya fue agregado')
    }

    const producto = productos.find((p) => p.id_producto == detalle.id_producto)

    const subtotal = Number(detalle.cantidad) * Number(detalle.precio_unitario)

    const nuevoDetalle = {
      id_producto: detalle.id_producto,

      nombre: producto?.nombre || '',

      cantidad: detalle.cantidad,

      precio_unitario: detalle.precio_unitario,

      subtotal,
    }

    const nuevosProductos = [...form.productos, nuevoDetalle]

    const total = nuevosProductos.reduce(
      (acc, item) => acc + Number(item.subtotal),
      0,
    )

    setForm({
      ...form,
      productos: nuevosProductos,
      total_compra: total,
    })

    setDetalle({
      id_producto: '',
      cantidad: 1,
      precio_unitario: '',
    })
  }

  const eliminarProducto = (id) => {
    const nuevosProductos = form.productos.filter((p) => p.id_producto !== id)

    const total = nuevosProductos.reduce(
      (acc, item) => acc + Number(item.subtotal),
      0,
    )

    setForm({
      ...form,
      productos: nuevosProductos,
      total_compra: total,
    })
  }

  const guardarCompra = async (e) => {
    e.preventDefault()

    if (!form.id_proveedor) {
      return toast.error('Selecciona un proveedor')
    }

    if (form.productos.length === 0) {
      return toast.error('Agrega productos')
    }

    try {
      setLoading(true)

      await createCompra(form)

      toast.success('Compra registrada correctamente')

      navigate('/compras')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al registrar compra')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="cp">
      <CompraHeader navigate={navigate} />

      <form onSubmit={guardarCompra}>
        <div className="cp-grid">
          <div>
            <CompraInfoForm
              form={form}
              setForm={setForm}
              proveedores={proveedores}
            />

            <AgregarProductoForm
              detalle={detalle}
              setDetalle={setDetalle}
              productos={productos}
              agregarProducto={agregarProducto}
            />

            <CompraProductosTable
              productos={form.productos}
              eliminarProducto={eliminarProducto}
            />
          </div>

          <CompraResumen total={form.total_compra} loading={loading} />
        </div>
      </form>
    </div>
  )
}

export default NuevaCompra
