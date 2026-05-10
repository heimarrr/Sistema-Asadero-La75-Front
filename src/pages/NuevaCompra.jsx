import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../api/api'

import toast from 'react-hot-toast'

import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
} from 'lucide-react'

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
    getProveedores()
    getProductos()
  }, [])

  const getProveedores = async () => {
    try {
      const res = await api.get('/proveedores')

      setProveedores(res.data.data)
    } catch {
      toast.error('Error cargando proveedores')
    }
  }

  const getProductos = async () => {
    try {
      const res = await api.get('/productos')

      setProductos(res.data.data || [])
    } catch {
      toast.error('Error cargando productos')
    }
  }

  const agregarProducto = () => {
    if (
      !detalle.id_producto ||
      !detalle.cantidad ||
      !detalle.precio_unitario
    ) {
      return toast.error('Completa los datos')
    }

    const productoExiste = form.productos.find(
      (p) =>
        p.id_producto ==
        detalle.id_producto,
    )

    if (productoExiste) {
      return toast.error(
        'El producto ya fue agregado',
      )
    }

    const producto = productos.find(
      (p) =>
        p.id_producto ==
        detalle.id_producto,
    )

    const subtotal =
      Number(detalle.cantidad) *
      Number(detalle.precio_unitario)

    const nuevoDetalle = {
      id_producto: detalle.id_producto,
      nombre: producto?.nombre || '',
      cantidad: detalle.cantidad,
      precio_unitario:
        detalle.precio_unitario,
      subtotal,
    }

    const nuevosProductos = [
      ...form.productos,
      nuevoDetalle,
    ]

    const total = nuevosProductos.reduce(
      (acc, item) =>
        acc + Number(item.subtotal),
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
    const nuevosProductos =
      form.productos.filter(
        (p) => p.id_producto !== id,
      )

    const total = nuevosProductos.reduce(
      (acc, item) =>
        acc + Number(item.subtotal),
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
      return toast.error(
        'Selecciona un proveedor',
      )
    }

    if (form.productos.length === 0) {
      return toast.error(
        'Agrega productos',
      )
    }

    try {
      setLoading(true)

      await api.post('/compras', form)

      toast.success(
        'Compra registrada correctamente',
      )

      navigate('/compras')
    } catch (error) {
      console.error(error)
      console.log(error.response)
      console.log(error.response.data)

      toast.error(
        error.response?.data?.message ||
          'Error al registrar compra',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        .cp {
          color: #fff;
          font-family: Inter, sans-serif;
        }

        .cp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .cp-title {
          font-size: 1.7rem;
          font-weight: 700;
        }

        .cp-sub {
          color: #6b7280;
          font-size: 13px;
        }

        .cp-btn-back {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #181a20;
          border: 1px solid #2f3441;
          padding: 10px 15px;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          text-decoration: none;
        }

        .cp-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 20px;
        }

        .cp-card {
          background: #232633;
          border: 1px solid #2f3441;
          border-radius: 16px;
          padding: 1.5rem;
        }

        .cp-card-title {
          font-size: 15px;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .cp-form-group {
          margin-bottom: 1rem;
        }

        .cp-label {
          display: block;
          margin-bottom: 6px;
          font-size: 13px;
          color: #9ca3af;
        }

        .cp-input,
        .cp-select {
          width: 100%;
          background: #181a20;
          border: 1px solid #2f3441;
          border-radius: 10px;
          padding: 12px;
          color: white;
          outline: none;
        }

        .cp-row {
          display: grid;
          grid-template-columns: 1fr 120px 140px auto;
          gap: 10px;
          align-items: end;
        }

        .cp-btn-add {
          height: 45px;
          border: none;
          background: #6366f1;
          color: white;
          border-radius: 10px;
          cursor: pointer;
        }

        .cp-table {
          width: 100%;
          border-collapse: collapse;
        }

        .cp-table th {
          text-align: left;
          padding: 12px;
          color: #6b7280;
          font-size: 11px;
          border-bottom: 1px solid #2f3441;
        }

        .cp-table td {
          padding: 12px;
          border-bottom: 1px solid #2f3441;
          font-size: 13px;
        }

        .cp-total {
          text-align: right;
          margin-top: 1.5rem;
        }

        .cp-total p {
          color: #6b7280;
          font-size: 11px;
          margin: 0;
        }

        .cp-total h2 {
          margin: 0;
          font-size: 30px;
          color: #6366f1;
        }

        .cp-btn-save {
          width: 100%;
          margin-top: 1.5rem;
          padding: 14px;
          border: none;
          border-radius: 12px;
          background: #6366f1;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        .cp-delete {
          width: 35px;
          height: 35px;
          border-radius: 8px;
          border: none;
          background: #3a1f24;
          color: #f87171;
          cursor: pointer;
        }
      `}</style>

      <div className="cp">
        <div className="cp-header">
          <div>
            <h1 className="cp-title">
              Nueva Compra
            </h1>

            <p className="cp-sub">
              Registrar ingreso de productos
            </p>
          </div>

          <button
            className="cp-btn-back"
            onClick={() =>
              navigate('/compras')
            }
          >
            <ArrowLeft size={16} />
            Volver
          </button>
        </div>

        <form onSubmit={guardarCompra}>
          <div className="cp-grid">
            <div>
              <div className="cp-card">
                <h3 className="cp-card-title">
                  Información General
                </h3>

                <div className="cp-form-group">
                  <label className="cp-label">
                    Proveedor
                  </label>

                  <select
                    className="cp-select"
                    value={form.id_proveedor}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        id_proveedor:
                          e.target.value,
                      })
                    }
                  >
                    <option value="">
                      Seleccionar
                    </option>

                    {proveedores.map((p) => (
                      <option
                        key={p.id_proveedor}
                        value={p.id_proveedor}
                      >
                        {p.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="cp-form-group">
                  <label className="cp-label">
                    Fecha
                  </label>

                  <input
                    type="date"
                    className="cp-input"
                    value={form.fecha}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        fecha: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div
                className="cp-card"
                style={{ marginTop: '20px' }}
              >
                <h3 className="cp-card-title">
                  Agregar Productos
                </h3>

                <div className="cp-row">
                  <div>
                    <label className="cp-label">
                      Producto
                    </label>

                    <select
                      className="cp-select"
                      value={detalle.id_producto}
                      onChange={(e) =>
                        setDetalle({
                          ...detalle,
                          id_producto:
                            e.target.value,
                        })
                      }
                    >
                      <option value="">
                        Seleccionar
                      </option>

                      {productos.map((p) => (
                        <option
                          key={p.id_producto}
                          value={p.id_producto}
                        >
                          {p.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="cp-label">
                      Cantidad
                    </label>

                    <input
                      type="number"
                      className="cp-input"
                      value={detalle.cantidad}
                      onChange={(e) =>
                        setDetalle({
                          ...detalle,
                          cantidad:
                            e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="cp-label">
                      Precio
                    </label>

                    <input
                      type="number"
                      className="cp-input"
                      value={
                        detalle.precio_unitario
                      }
                      onChange={(e) =>
                        setDetalle({
                          ...detalle,
                          precio_unitario:
                            e.target.value,
                        })
                      }
                    />
                  </div>

                  <button
                    type="button"
                    className="cp-btn-add"
                    onClick={agregarProducto}
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <table className="cp-table">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Subtotal</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {form.productos.map(
                        (item) => (
                          <tr
                            key={
                              item.id_producto
                            }
                          >
                            <td>
                              {item.nombre}
                            </td>

                            <td>
                              {item.cantidad}
                            </td>

                            <td>
                              $
                              {Number(
                                item.precio_unitario,
                              ).toLocaleString()}
                            </td>

                            <td>
                              $
                              {Number(
                                item.subtotal,
                              ).toLocaleString()}
                            </td>

                            <td>
                              <button
                                type="button"
                                className="cp-delete"
                                onClick={() =>
                                  eliminarProducto(
                                    item.id_producto,
                                  )
                                }
                              >
                                <Trash2
                                  size={15}
                                />
                              </button>
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div>
              <div className="cp-card">
                <h3 className="cp-card-title">
                  Resumen
                </h3>

                <div className="cp-total">
                  <p>TOTAL COMPRA</p>

                  <h2>
                    $
                    {Number(
                      form.total_compra,
                    ).toLocaleString()}
                  </h2>
                </div>

                <button
                  type="submit"
                  className="cp-btn-save"
                  disabled={loading}
                >
                  <Save size={16} />

                  {loading
                    ? ' Guardando...'
                    : ' Guardar Compra'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default NuevaCompra