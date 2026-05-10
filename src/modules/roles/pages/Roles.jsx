import { useEffect, useState } from 'react'
import api from '../../../api/api'
import toast from 'react-hot-toast'
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
  X,
  Shield,
} from 'lucide-react'


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

  const getRoles = async () => {
    try {
      const res = await api.get('/roles')
      setRoles(res.data.data)
    } catch {
      toast.error('Error al cargar roles')
    }
  }

  useEffect(() => {
    getRoles()
  }, [])

  const handleChange = (e) => {
    let value = e.target.value
    if (e.target.name === 'status') value = value === '1'

    setForm({ ...form, [e.target.name]: value })
  }

  const openCreate = () => {
    setForm({ nombre: '', descripcion: '', status: true })
    setEditando(false)
    setModalOpen(true)
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editando) {
        await api.put(`/roles/${idActual}`, form)
        toast.success('Rol actualizado')
      } else {
        await api.post('/roles', form)
        toast.success('Rol creado')
      }

      setModalOpen(false)
      getRoles()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar rol?')) return

    try {
      await api.delete(`/roles/${id}`)
      toast.success('Rol eliminado')
      getRoles()
    } catch {
      toast.error('Error al eliminar')
    }
  }

  const toggleEstado = async (id) => {
    try {
      await api.post(`/roles/${id}/toggle-estado`)
      toast.success('Estado actualizado')
      getRoles()
    } catch {
      toast.error('Error al cambiar estado')
    }
  }

  return (
    <>


      <div className="pg">
        <div className="pg-header">
          <div>
            <h1 className="pg-title">Roles</h1>
            <p className="pg-sub">{roles.length} roles</p>
          </div>

          <button className="pg-btn-new" onClick={openCreate}>
            <Plus size={16} /> Nuevo
          </button>
        </div>

        <div className="pg-card">
          <table className="pg-table">
            <thead>
              <tr>
                <th>Rol</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {roles.map((r) => (
                <tr key={r.id_rol}>
                  <td>
                    <div className="pg-role">
                      <div className="pg-icon">
                        <Shield size={16} />
                      </div>
                      {r.nombre}
                    </div>
                  </td>

                  <td>{r.descripcion}</td>

                  <td>
                    <span
                      className={`pg-badge ${r.status ? 'active' : 'inactive'}`}
                    >
                      {r.status ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>

                  <td>
                    <div className="pg-actions">
                      <button
                        className="pg-btn edit"
                        onClick={() => openEdit(r)}
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        className="pg-btn toggle"
                        onClick={() => toggleEstado(r.id_rol)}
                      >
                        {r.status ? (
                          <ToggleRight size={14} />
                        ) : (
                          <ToggleLeft size={14} />
                        )}
                      </button>

                      <button
                        className="pg-btn del"
                        onClick={() => handleDelete(r.id_rol)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modalOpen && (
          <div className="pg-overlay">
            <div className="pg-modal">
              <div className="pg-modal-header">
                <h3>{editando ? 'Editar' : 'Nuevo'} Rol</h3>
                <button onClick={() => setModalOpen(false)}>
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="pg-modal-body">
                  <input
                    name="nombre"
                    placeholder="Nombre"
                    onChange={handleChange}
                    value={form.nombre}
                    className="pg-input"
                  />
                  <input
                    name="descripcion"
                    placeholder="Descripción"
                    onChange={handleChange}
                    value={form.descripcion}
                    className="pg-input"
                  />

                  <select
                    name="status"
                    onChange={handleChange}
                    value={form.status ? '1' : '0'}
                    className="pg-select"
                  >
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                  </select>
                </div>

                <div className="pg-modal-footer">
                  <button
                    type="button"
                    className="pg-btn-cancel"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="pg-btn-save">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Roles
