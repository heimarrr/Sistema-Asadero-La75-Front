import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ProveedorForm from '../components/ProveedorForm'
import ProveedorModal from '../components/ProveedorModal'
import '@/styles/global.css'
import '@/styles/components/table.css'
import '@/styles/components/modal.css'
import Table from '@/components/ui/Table'

import {
  Plus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Truck,
} from 'lucide-react'

import {
  getProveedores,
  createProveedor,
  updateProveedor,
  deleteProveedor,
  toggleProveedorEstado,
} from '../services/proveedorService'

function Proveedores() {
  const [proveedores, setProveedores] = useState([])

  const [modalOpen, setModalOpen] = useState(false)

  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    correo: '',
    status: true,
  })

  const [editando, setEditando] = useState(false)

  const [idActual, setIdActual] = useState(null)

  const loadProveedores = async () => {
    try {
      const data = await getProveedores()

      setProveedores(data)
    } catch {
      toast.error('Error al cargar proveedores')
    }
  }

  useEffect(() => {
    loadProveedores()
  }, [])

  const handleChange = (e) => {
    let value = e.target.value

    if (e.target.name === 'status') {
      value = value === '1'
    }

    setForm({
      ...form,
      [e.target.name]: value,
    })
  }

  const openCreate = () => {
    setForm({
      nombre: '',
      telefono: '',
      direccion: '',
      correo: '',
      status: true,
    })

    setEditando(false)

    setModalOpen(true)
  }

  const openEdit = (p) => {
    setForm({
      nombre: p.nombre,
      telefono: p.telefono || '',
      direccion: p.direccion || '',
      correo: p.correo || '',
      status: p.status,
    })

    setIdActual(p.id_proveedor)

    setEditando(true)

    setModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editando) {
        await updateProveedor(idActual, form)

        toast.success('Proveedor actualizado')
      } else {
        await createProveedor(form)

        toast.success('Proveedor creado')
      }

      setModalOpen(false)

      loadProveedores()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar proveedor?')) {
      return
    }

    try {
      await deleteProveedor(id)

      toast.success('Proveedor eliminado')

      loadProveedores()
    } catch {
      toast.error('Error al eliminar')
    }
  }

  const toggleEstado = async (id) => {
    try {
      await toggleProveedorEstado(id)

      toast.success('Estado actualizado')

      loadProveedores()
    } catch {
      toast.error('Error al cambiar estado')
    }
  }

  const columns = [
    {
      header: 'Proveedor',
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
      header: 'Teléfono',
      accessor: 'telefono',
    },

    {
      header: 'Correo',
      accessor: 'correo',
    },

    {
      header: 'Dirección',
      accessor: 'direccion',
    },

    {
      header: 'Estado',
      render: (p) => (
        <span className={`pg-badge ${p.status ? 'active' : 'inactive'}`}>
          {p.status ? 'Activo' : 'Inactivo'}
        </span>
      ),
    },

    {
      header: 'Acciones',
      render: (p) => (
        <div className="pg-actions">
          <button className="pg-btn edit" onClick={() => openEdit(p)}>
            <Pencil size={14} />
          </button>

          <button
            className="pg-btn toggle"
            onClick={() => toggleEstado(p.id_proveedor)}
          >
            {p.status ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
          </button>

          <button
            className="pg-btn del"
            onClick={() => handleDelete(p.id_proveedor)}
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
          <h1 className="pg-title">Proveedores</h1>

          <p className="pg-sub">{proveedores.length} registrados</p>
        </div>

        <button className="pg-btn-new" onClick={openCreate}>
          <Plus size={16} />
          Nuevo
        </button>
      </div>

      {/* TABLA */}

      <Table columns={columns} data={proveedores} />

      {/* MODAL */}

      <ProveedorModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editando ? 'Editar Proveedor' : 'Nuevo Proveedor'}
      >
        <ProveedorForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onClose={() => setModalOpen(false)}
          editando={editando}
        />
      </ProveedorModal>
    </div>
  )
}

export default Proveedores
