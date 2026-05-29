import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import '@/styles/global.css'
import '@/styles/components/table.css'
import '@/styles/components/modal.css'
import Table from '@/components/ui/Table'
import Modal from '@/components/ui/Modal'
import UsuarioForm from '../components/UsuarioForm'
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  toggleUsuarioEstado,
} from '../services/usuariosService'

import {getRoles,} from '@/modules/roles/services/rolesService'

import {
  Plus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Users,
} from 'lucide-react'

function Usuarios() {

  const [usuarios, setUsuarios] = useState([])
  const [roles, setRoles] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)

  const [form, setForm] = useState({
    nombre: '',
    usuario: '',
    correo: '',
    contrasena: '',
    id_rol: '',
    estado: true,
  })

  const [editando, setEditando] = useState(false)

  const [idActual, setIdActual] = useState(null)

  // =========================
  // CARGAR USUARIOS
  // =========================

  const loadUsuarios = async () => {

    try {

      const data = await getUsuarios(page)

      setUsuarios(data.data)
      setLastPage(data.last_page)

    } catch {

      toast.error('Error al cargar usuarios')
    }
  }


  const loadRoles = async () => {

    try {

      const data = await getRoles()

      setRoles(data.data)

    } catch {

      toast.error('Error al cargar roles')
    }
  }


  useEffect(() => {

    loadUsuarios()
    loadRoles()

  }, [page])

  const handleChange = (e) => {

    let value = e.target.value

    if (e.target.name === 'estado') {
      value = value === '1'
    }

    if (e.target.name === 'id_rol') {
      value = parseInt(value)
    }

    setForm({
      ...form,
      [e.target.name]: value,
    })
  }

  // =========================
  // ABRIR CREAR
  // =========================

  const openCreate = () => {

    setForm({
      nombre: '',
      usuario: '',
      correo: '',
      contrasena: '',
      id_rol: roles[0]?.id_rol || '',
      estado: true,
    })

    setEditando(false)

    setIdActual(null)

    setModalOpen(true)
  }

  // =========================
  // ABRIR EDITAR
  // =========================

  const openEdit = (user) => {

    setForm({
      nombre: user.nombre,
      usuario: user.usuario,
      correo: user.correo,
      contrasena: '',
      id_rol: user.id_rol,
      estado: user.estado,
    })

    setIdActual(user.id_usuario)

    setEditando(true)

    setModalOpen(true)
  }

  // =========================
  // GUARDAR
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const dataToSend = { ...form }

      if (!dataToSend.contrasena) {
        delete dataToSend.contrasena
      }

      if (editando) {

        await updateUsuario(
          idActual,
          dataToSend
        )

        toast.success('Usuario actualizado')

      } else {

        await createUsuario(dataToSend)

        toast.success('Usuario creado')
      }

      setModalOpen(false)

      loadUsuarios()

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        'Error en operación'
      )
    }
  }

  // =========================
  // ELIMINAR
  // =========================

  const handleDelete = async (id) => {

    if (!confirm('¿Eliminar usuario?')) return

    try {

      await deleteUsuario(id)

      toast.success('Usuario eliminado')

      loadUsuarios()

    } catch {

      toast.error('Error al eliminar')
    }
  }

  // =========================
  // TOGGLE ESTADO
  // =========================

  const toggleEstado = async (id) => {

    try {

      await toggleUsuarioEstado(id)

      toast.success('Estado actualizado')

      loadUsuarios()

    } catch {

      toast.error('Error al cambiar estado')
    }
  }

  // =========================
  // COLUMNAS TABLA
  // =========================

  const columns = [

    {
      header: 'Nombre',

      render: (u) => (
        <div className='pg-role'>

          <div className='pg-icon'>
            <Users size={16} />
          </div>

          {u.nombre}

        </div>
      ),
    },

    {
      header: 'Usuario',
      accessor: 'usuario',
    },

    {
      header: 'Correo',
      accessor: 'correo',
    },

    {
      header: 'Rol',

      render: (u) =>
        u.rol?.nombre || '-',
    },

    {
      header: 'Estado',

      render: (u) => (
        <span
          className={`pg-badge ${
            u.estado
              ? 'active'
              : 'inactive'
          }`}
        >
          {u.estado
            ? 'Activo'
            : 'Inactivo'
          }
        </span>
      ),
    },

    {
      header: 'Acciones',

      render: (u) => (

        <div className="pg-actions">

          <button
            className="pg-btn edit"
            onClick={() => openEdit(u)}
          >
            <Pencil size={14} />
          </button>

          <button
            className="pg-btn toggle"
            onClick={() =>
              toggleEstado(u.id_usuario)
            }
          >
            {u.estado
              ? <ToggleRight size={14} />
              : <ToggleLeft size={14} />
            }
          </button>

          <button
            className="pg-btn del"
            onClick={() =>
              handleDelete(u.id_usuario)
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

      <div className="pg-header">

        <div>

          <h1 className="pg-title">
            Usuarios
          </h1>

          <p className="pg-sub">
            {usuarios.length} usuarios
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
        data={usuarios}
        rowKey="id_usuario"
        page={page}
        lastPage={lastPage}
        onPageChange={setPage}
      />

      {/* MODAL */}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          editando
            ? 'Editar Usuario'
            : 'Nuevo Usuario'
        }
      >

        <UsuarioForm
          form={form}
          roles={roles}
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

export default Usuarios