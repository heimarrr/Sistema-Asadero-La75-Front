import { useEffect, useState } from 'react'
import api from '../api/api'
import toast from 'react-hot-toast'

import {
  Plus,
  Pencil,
  Trash2,
  ToggleRight,
  X,
} from 'lucide-react'

import Table from '@/components/ui/Table'

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

  // =========================
  // PETICIONES
  // =========================

  const getProductos = async () => {
    try {
      const res = await api.get('/productos')
      setProductos(res.data.data)
    } catch {
      toast.error('Error al cargar productos')
    }
  }

  const getCategorias = async () => {
    try {
      const res = await api.get('/categorias')
      setCategorias(res.data.data)
    } catch {
      toast.error('Error al cargar categorías')
    }
  }

  useEffect(() => {
    getProductos()
    getCategorias()
  }, [])

  // =========================
  // FORM
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target

    let newValue = value

    if (name === 'status') {
      newValue = value === '1'
    }

    setForm({
      ...form,
      [name]: newValue,
    })
  }

  // =========================
  // MODAL CREATE
  // =========================

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
        await api.put(`/productos/${idActual}`, form)
        toast.success('Producto actualizado')
      } else {
        await api.post('/productos', form)
        toast.success('Producto creado')
      }

      setModalOpen(false)
      getProductos()
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
      await api.delete(`/productos/${id}`)

      toast.success('Producto eliminado')

      getProductos()
    } catch {
      toast.error('Error al eliminar')
    }
  }

  // =========================
  // TOGGLE ESTADO
  // =========================

  const toggleEstado = async (id) => {
    try {
      await api.post(`/productos/${id}/toggle-estado`)

      toast.success('Estado actualizado')

      getProductos()
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
      accessor: 'nombre',
    },

    {
      header: 'Categoría',
      render: (p) => p.categoria?.nombre || '-',
    },

    {
      header: 'Stock',
      render: (p) =>
        `${p.stock_actual} ${p.unidad_medida}`,
    },

    {
      header: 'Precio Venta',
      render: (p) =>
        `$${Number(p.precio_venta).toLocaleString()}`,
    },

    {
      header: 'Estado',
      render: (p) => (
        <span
          className={`badge ${
            p.status ? 'active' : 'inactive'
          }`}
        >
          {p.status ? 'Activo' : 'Inactivo'}
        </span>
      ),
    },

    {
      header: 'Acciones',
      render: (p) => (
        <div
          style={{
            display: 'flex',
            gap: '8px',
          }}
        >
          <button
            onClick={() => openEdit(p)}
            style={{
              background: 'none',
              border: 'none',
              color: '#6366f1',
              cursor: 'pointer',
            }}
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() =>
              toggleEstado(p.id_producto)
            }
            style={{
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
            }}
          >
            <ToggleRight size={16} />
          </button>

          <button
            onClick={() =>
              handleDelete(p.id_producto)
            }
            style={{
              background: 'none',
              border: 'none',
              color: '#f87171',
              cursor: 'pointer',
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="pg-container">
      <style>{`
        .pg-container {
          font-family: 'Inter', sans-serif;
        }

        .pg-header {
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:1.8rem;
        }

        .pg-title {
          font-size:1.5rem;
          font-weight:600;
          color:#fff;
        }

        .pg-btn-main {
          display:flex;
          gap:8px;
          align-items:center;
          padding:10px 18px;
          border-radius:10px;
          background:#6366f1;
          color:#fff;
          border:none;
          cursor:pointer;
          font-weight:500;
        }

        /* BADGES */

        .badge {
          padding:4px 10px;
          border-radius:20px;
          font-size:11px;
        }

        .active {
          background:rgba(74, 222, 128, 0.1);
          color:#4ade80;
        }

        .inactive {
          background:rgba(248, 113, 113, 0.1);
          color:#f87171;
        }

        /* MODAL */

        .prod-overlay {
          position:fixed;
          inset:0;
          background:rgba(0,0,0,0.8);

          display:flex;
          align-items:center;
          justify-content:center;

          z-index:9999;

          backdrop-filter: blur(4px);
        }

        .prod-modal {
          background:#1e2028;
          border:1px solid #2a2d36;
          border-radius:16px;

          width:95%;
          max-width:500px;

          color:#fff;

          overflow:hidden;

          box-shadow:
            0 25px 50px -12px rgba(0,0,0,0.5);
        }

        .prod-modal-head {
          display:flex;
          justify-content:space-between;

          padding:1.2rem;

          border-bottom:1px solid #2a2d36;

          background:#252832;
        }

        .prod-modal-body {
          padding:1.5rem;

          display:grid;
          grid-template-columns:1fr 1fr;

          gap:15px;
        }

        .prod-full {
          grid-column:span 2;
        }

        .prod-modal-foot {
          padding:1rem;

          display:flex;
          justify-content:flex-end;
          gap:12px;

          background:#1a1c23;
        }

        .prod-input {
          background:#12141a;
          border:1px solid #2a2d36;
          color:#fff;

          padding:10px;

          border-radius:8px;

          width:100%;

          box-sizing:border-box;
        }

        .prod-input:focus {
          border-color:#6366f1;
          outline:none;
        }

        .btn-save {
          background:#6366f1;
          color:white;

          padding:10px 20px;

          border-radius:8px;
          border:none;

          cursor:pointer;

          font-weight:600;
        }

        .btn-cancel {
          background:transparent;
          color:#9ca3af;

          padding:10px 20px;

          border-radius:8px;
          border:1px solid #2a2d36;

          cursor:pointer;
        }

        @media (max-width:768px) {
          .pg-header {
            flex-direction:column;
            align-items:stretch;
            gap:12px;
          }

          .pg-btn-main {
            justify-content:center;
          }

          .prod-modal-body {
            grid-template-columns:1fr;
          }

          .prod-full {
            grid-column:span 1;
          }
        }
      `}</style>

      {/* HEADER */}

      <div className="pg-header">
        <h1 className="pg-title">
          Productos
        </h1>

        <button
          className="pg-btn-main"
          onClick={openCreate}
        >
          <Plus size={18} />
          Nuevo Producto
        </button>
      </div>

      {/* TABLA */}

      <Table
        columns={columns}
        data={productos}
      />

      {/* MODAL */}

      {modalOpen && (
        <div className="prod-overlay">
          <div className="prod-modal">
            <div className="prod-modal-head">
              <h3 style={{ margin: 0 }}>
                {editando
                  ? 'Editar Producto'
                  : 'Nuevo Producto'}
              </h3>

              <button
                onClick={() =>
                  setModalOpen(false)
                }
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="prod-modal-body">
                <div className="prod-full">
                  <label>
                    NOMBRE
                  </label>

                  <input
                    className="prod-input"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="prod-full">
                  <label>
                    DESCRIPCIÓN
                  </label>

                  <input
                    className="prod-input"
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>
                    STOCK ACTUAL
                  </label>

                  <input
                    className="prod-input"
                    type="number"
                    name="stock_actual"
                    value={form.stock_actual}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label>
                    UNIDAD MEDIDA
                  </label>

                  <input
                    className="prod-input"
                    name="unidad_medida"
                    value={form.unidad_medida}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label>
                    PRECIO COMPRA
                  </label>

                  <input
                    className="prod-input"
                    type="number"
                    name="precio_compra"
                    value={form.precio_compra}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>
                    PRECIO VENTA
                  </label>

                  <input
                    className="prod-input"
                    type="number"
                    name="precio_venta"
                    value={form.precio_venta}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="prod-full">
                  <label>
                    CATEGORÍA
                  </label>

                  <select
                    className="prod-input"
                    name="id_categoria"
                    value={form.id_categoria}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Seleccione...
                    </option>

                    {categorias.map((c) => (
                      <option
                        key={c.id_categoria}
                        value={c.id_categoria}
                      >
                        {c.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="prod-modal-foot">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() =>
                    setModalOpen(false)
                  }
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="btn-save"
                >
                  Guardar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Productos