import { useEffect, useState } from 'react'
import api from '@/api/api'
import toast from 'react-hot-toast'
import Table from '@/components/ui/Table'
import Modal from '@/components/ui/Modal'
import ProductoForm from '../components/ProductoForm'
import '@/styles/global.css'
import '@/styles/components/table.css'
import '@/styles/components/modal.css'

import {
  Plus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Truck,
} from 'lucide-react'

import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
  toggleProductoEstado,
} from '../services/productosService'

import {
  getCategorias,
} from '@/modules/categorias/services/categoriasService'

function Productos() {

  const [productos, setProductos] = useState([])

  const [categorias, setCategorias] = useState([])

  const [modalOpen, setModalOpen] = useState(false)

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    stock_actual: 0,
    unidad_medida: '',
    precio_compra: '',
    precio_venta: '',
    tipo: 'insumo',
    status: true,
    id_categoria: '',
  })

  const [editando, setEditando] = useState(false)
  const [idActual, setIdActual] = useState(null)

  const LoadProductos = async () => {

    try {

      const data = await getProductos()

      setProductos(data)

    } catch {

      toast.error('Error al cargar productos')
    }
  }

  const LoadCategorias = async () => {

    try {

      const data = await getCategorias()

      setCategorias(data)

    } catch {

      toast.error('Error al cargar categorías')
    }
  }

  useEffect(() => {

    LoadProductos()
    LoadCategorias()

  }, [])


  const handleChange = (e) => {

    const { name, value } = e.target

    let newValue = value

    if (name === 'status') {
      newValue = value === '1'
    }

    if (name === 'id_categoria') {
      newValue = parseInt(value)
    }

    setForm({
      ...form,
      [name]: newValue,
    })
  }


  const openCreate = () => {

    setForm({
      nombre: '',
      descripcion: '',
      stock_actual: 0,
      unidad_medida: '',
      precio_compra: '',
      precio_venta: '',
      tipo: 'insumo',
      status: true,

      id_categoria:
        categorias.length > 0
          ? categorias[0].id_categoria
          : '',
    })

    setEditando(false)

    setIdActual(null)

    setModalOpen(true)
  }

  // =========================
  // MODAL EDIT
  // =========================

  const openEdit = (p) => {

    setForm({
      nombre: p.nombre,
      descripcion: p.descripcion || '',
      stock_actual: p.stock_actual,
      unidad_medida: p.unidad_medida,
      precio_compra: p.precio_compra || '',
      precio_venta: p.precio_venta || '',
      tipo: p.tipo,
      status: p.status,
      id_categoria: p.id_categoria,
    })

    setIdActual(p.id_producto)

    setEditando(true)

    setModalOpen(true)
  }

  // =========================
  // GUARDAR
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      if (editando) {

        await updateProducto(idActual, form)

        toast.success('Producto actualizado')

      } else {

        await createProducto(form)
        toast.success('Producto creado')
      }

      setModalOpen(false)

      LoadProductos()

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        'Error al guardar'
      )
    }
  }

  // =========================
  // ELIMINAR
  // =========================

  const handleDelete = async (id) => {

    if (!confirm('¿Eliminar producto?')) return

    try {

      await deleteProducto(id)
      toast.success('Producto eliminado')

      LoadProductos()

    } catch {

      toast.error('Error al eliminar')
    }
  }

  // =========================
  // TOGGLE ESTADO
  // =========================

  const toggleEstado = async (id) => {

    try {

      await toggleProductoEstado(id)
      toast.success('Estado actualizado')
      LoadProductos()
    } catch {

      toast.error('Error al cambiar estado')
    }
  }

  const columns = [

    {
      header: 'Producto',

      render: (p) => (
        <div className="pg-role">
          <div className="pg-icon">
            <Truck size={16} />
          </div>
          {p.nombre}
        </div>
      ),
    },

    {
      header: 'Descripción',
      accessor: 'descripcion',
    },

    {
      header: 'Stock',
      accessor: 'stock_actual',
    },

    {
      header: 'Tipo',
      accessor: 'tipo',
    },

    {
      header: 'Unidad',
      accessor: 'unidad_medida',
    },

    {
      header: 'Compra',
      accessor: 'precio_compra',
    },

    {
      header: 'Venta',
      accessor: 'precio_venta',
    },

    {
      header: 'Categoría',

      render: (p) =>
        p.categoria?.nombre || '-',
    },

    {
      header: 'Estado',

      render: (p) => (

        <span
          className={`pg-badge ${
            p.status
              ? 'active'
              : 'inactive'
          }`}
        >
          {p.status
            ? 'Activo'
            : 'Inactivo'}
        </span>
      ),
    },

    {
      header: 'Acciones',

      render: (p) => (

        <div className="pg-actions">

          <button
            className="pg-btn edit"
            onClick={() => openEdit(p)}
          >
            <Pencil size={14} />
          </button>

          <button
            className="pg-btn toggle"
            onClick={() =>
              toggleEstado(p.id_producto)
            }
          >
            {p.status
              ? <ToggleRight size={14} />
              : <ToggleLeft size={14} />
            }
          </button>

          <button
            className="pg-btn del"
            onClick={() =>
              handleDelete(p.id_producto)
            }
          >
            <Trash2 size={14} />
          </button>

        </div>
      ),
    },
  ]

  return (

    <div className="pg">

      {/* HEADER */}

      <div className="pg-header">

        <div>

          <h1 className="pg-title">
            Productos
          </h1>

          <p className="pg-sub">
            {productos.length} productos
          </p>

        </div>

        <button
          className="pg-btn-new"
          onClick={openCreate}
        >
          <Plus size={16} />
          Nuevo
        </button>

      </div>

      {/* TABLA */}

      <Table
        columns={columns}
        data={productos}
        rowKey="id_producto"
      />

      {/* MODAL */}

      <Modal
        open={modalOpen}
        onClose={() =>
          setModalOpen(false)
        }
        title={
          editando
            ? 'Editar Producto'
            : 'Nuevo Producto'
        }
      >

        <ProductoForm
          form={form}
          categorias={categorias}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onClose={() =>
            setModalOpen(false)
          }
          editando={editando}
        />

      </Modal>

    </div>
  )
}

export default Productos