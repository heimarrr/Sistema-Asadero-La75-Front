import { useEffect, useState } from 'react'
import api from '@/api/api'
import toast from 'react-hot-toast'
import '@/styles/global.css'
import '@/styles/components/table.css'
import '@/styles/components/modal.css'
import Table from '@/components/ui/Table'
import Modal from '../../../components/ui/Modal';
import CategoriaForm from '../components/CategoriaForm'
import {
  Plus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  X,
  Tag,
} from 'lucide-react'

import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  toggleCategoriaEstado,
} from '../services/categoriasService'

function Categorias() {
  const [categorias, setCategorias] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    status: true,
  })

  const [editando, setEditando] = useState(false)
  const [idActual, setIdActual] = useState(null)

  const LoadCategorias = async () => {
    try {
      const data = await getCategorias()
      setCategorias(data)
    } catch {
      toast.error('Error al cargar categorías')
    }
  }

  useEffect(() => {
    LoadCategorias()
  }, [])

  const handleChange = (e) => {
    let value = e.target.value
    if (e.target.name === 'status') value = value === '1'

    setForm({ ...form, [e.target.name]: value })
  }

  const openCreate = () => {
    setForm({
      nombre: '',
      descripcion: '',
      status: true,
    })
    setEditando(false)
    setModalOpen(true)
  }

  const openEdit = (c) => {
    setForm({
      nombre: c.nombre,
      descripcion: c.descripcion || '',
      status: c.status,
    })

    setIdActual(c.id_categoria)
    setEditando(true)
    setModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editando) {
        await updateCategoria(idActual, form)
        toast.success('Categoría actualizada')
      } else {
        await createCategoria(form)
        toast.success('Categoría creada')
      }

      setModalOpen(false)
      LoadCategorias()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar categoría?')) return

    try {
      await deleteCategoria(id)
      toast.success('Categoría eliminada')
      LoadCategorias()
    } catch {
      toast.error('No se puede eliminar')
    }
  }

  const toggleEstado = async (id) => {
    try {
      await toggleCategoriaEstado(id)
      toast.success('Estado actualizado')
      LoadCategorias()
    } catch {
      toast.error('Error al cambiar estado')
    }
  }

  const columns = [
    {
      header: 'Categoría',
      render: (c) => (
        <div className="pg-role">
          <div className="pg-icon">
            <Tag size={16} />
          </div>

          {c.nombre}
        </div>
      ),
    },

    {
      header: 'Nombre',
      accessor: 'nombre',
    },

    {
      header: 'Descripción',
      accessor: 'descripcion',
    },


    {
      header: 'Estado',
      render: (c) => (
        <span className={`pg-badge ${c.status ? 'active' : 'inactive'}`}>
          {c.status ? 'Activo' : 'Inactivo'}
        </span>
      ),
    },

    {
      header: 'Acciones',
      render: (c) => (
        <div className="pg-actions">
          <button className="pg-btn edit" onClick={() => openEdit(c)}>
            <Pencil size={14} />
          </button>

          <button
            className="pg-btn toggle"
            onClick={() => toggleEstado(c.id_categoria)}
          >
            {c.status ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
          </button>

          <button
            className="pg-btn del"
            onClick={() => handleDelete(c.id_categoria)}
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ]



  return (
    <>

      <div className="pg">
        <div className="pg-header">
          <div>
            <h1 className="pg-title">Categorías</h1>
            <p className="pg-sub">{categorias.length} Categorias</p>
          </div>

          <button className="pg-btn-new" onClick={openCreate}>
            <Plus size={16} /> Nueva
          </button>
        </div>

        {/* TABLA */}
        
        <Table columns={columns} data={categorias} />

        {/* MODAL */}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editando ? 'Editar Categoría' : 'Nueva Categoría'}
      >
        <CategoriaForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onClose={() => setModalOpen(false)}
          editando={editando}
        />
      </Modal>
      </div>
    </>
  )
}

export default Categorias
