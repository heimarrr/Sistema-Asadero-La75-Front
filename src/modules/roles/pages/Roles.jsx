import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import '@/styles/global.css'
import '@/styles/components/table.css'
import '@/styles/components/modal.css'
import Table from '@/components/ui/Table'
import Modal from '../../../components/ui/Modal'
import RolForm from '../components/RolForm'
import {
  Plus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  X,
  Shield,
} from 'lucide-react'

import {
  getRoles,
  createRol,
  updateRol,
  deleteRol,
  toggleRolEstado,
} from '@/modules/roles/services/rolesService'

function Roles() {
  const [roles, setRoles] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    status: true,
  })

  const [editando, setEditando] = useState(false)
  const [idActual, setIdActual] = useState(null)

  // cargar roles
  const loadRoles = async () => {
    try {
      const data = await getRoles()

      setRoles(Array.isArray(data) ? data : [])
    } catch {
      toast.error('Error al cargar roles')
      setRoles([])
    }
  }

  useEffect(() => {
    loadRoles()
  }, [])

  // cambios formulario
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

  // abrir crear
  const openCreate = () => {
    setForm({
      nombre: '',
      descripcion: '',
      status: true,
    })

    setEditando(false)
    setIdActual(null)
    setModalOpen(true)
  }

  // abrir editar
  const openEdit = (rol) => {
    setForm({
      nombre: rol.nombre,
      descripcion: rol.descripcion || '',
      status: rol.status,
    })

    setIdActual(rol.id_rol)
    setEditando(true)
    setModalOpen(true)
  }

  // guardar
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editando) {
        await updateRol(idActual, form)

        toast.success('Rol actualizado')
      } else {
        await createRol(form)

        toast.success('Rol creado')
      }

      setModalOpen(false)

      loadRoles()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error')
    }
  }

  // eliminar
  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar rol?')) return

    try {
      await deleteRol(id)

      toast.success('Rol eliminado')

      loadRoles()
    } catch {
      toast.error('Error al eliminar')
    }
  }

  // cambiar estado
  const toggleEstado = async (id) => {
    try {
      await toggleRolEstado(id)

      toast.success('Estado actualizado')

      loadRoles()
    } catch {
      toast.error('Error al cambiar estado')
    }
  }

  const columns = [
    {
      header: 'Rol',
      render: (r) => (
        <div className="pg-role">
          <div className="pg-icon">
            <Shield size={16} />
          </div>
          {r.nombre}
        </div>
      ),
    },

    {
      header: 'Descripción',
      accessor: 'descripcion',
    },

    {
      header: 'Estado',
      render: (r) => (
        <span className={`pg-badge ${r.status ? 'active' : 'inactive'}`}>
          {r.status ? 'Activo' : 'Inactivo'}
        </span>
      ),
    },

    {
      header: 'Acciones',
      render: (r) => (
        <div className="pg-actions">
          <button className="pg-btn edit" onClick={() => openEdit(r)}>
            <Pencil size={14} />
          </button>

          <button
            className="pg-btn toggle"
            onClick={() => toggleEstado(r.id_rol)}
          >
            {r.status ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
          </button>

          <button className="pg-btn del" onClick={() => handleDelete(r.id_rol)}>
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="pg">
      <div className="pg-header">
        <div>
          <h1 className="pg-title">Roles</h1>

          <p className="pg-sub">{roles?.length || 0} roles</p>
        </div>

        <button className="pg-btn-new" onClick={openCreate}>
          <Plus size={16} />
          Nuevo
        </button>
      </div>

      {/* TABLA */}

      <Table columns={columns} data={roles} />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editando ? 'Editar Rol' : 'Nuevo Rol'}
      >
        <RolForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onClose={() => setModalOpen(false)}
          editando={editando}
        />
      </Modal>
    </div>
  )
}

export default Roles
