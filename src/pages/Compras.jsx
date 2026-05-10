import { useEffect, useState } from 'react'
import api from '../api/api'
import toast from 'react-hot-toast'
import { Eye, Trash2, X } from 'lucide-react'
import { Link } from 'react-router-dom'

function Compras() {
  const [compras, setCompras] = useState([])
  const [compraDetalle, setCompraDetalle] = useState(null)
  const [compraEliminar, setCompraEliminar] = useState(null)

  const [modalDetalle, setModalDetalle] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)

  const getCompras = async () => {
    try {
      const res = await api.get('/compras')

      console.log(res.data)

      setCompras(res.data.data || [])
    } catch (error) {
      console.error(error)

      toast.error('Error al cargar compras')
    }
  }

  useEffect(() => {
    getCompras()
  }, [])

  const verDetalle = async (id) => {
    try {
      const res = await api.get(`/compras/${id}`)

      console.log(res.data)

      setCompraDetalle(res.data.data)

      setModalDetalle(true)
    } catch (error) {
      console.error(error)

      toast.error('Error al obtener detalle')
    }
  }

  const openEliminar = (compra) => {
    setCompraEliminar(compra)
    setModalEliminar(true)
  }

  const confirmarEliminar = async () => {
    try {
      await api.delete(
        `/compras/${compraEliminar.id_compra}`,
      )

      toast.success('Compra anulada')

      setModalEliminar(false)

      getCompras()
    } catch (error) {
      console.error(error)

      toast.error(
        error.response?.data?.message ||
          'Error al anular compra',
      )
    }
  }

  return (
    <>
      <style>{`
        .pg {
          font-family: 'Inter', sans-serif;
          color: #e5e7eb;
        }

        .pg-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .pg-title {
          font-size: 1.6rem;
          font-weight: 600;
          color: #fff;
        }

        .pg-sub {
          font-size: 13px;
          color: #6b7280;
        }

        .pg-btn-new {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 10px;
          background: #6366f1;
          color: white;
          border: none;
          cursor: pointer;
          text-decoration: none;
          font-size: 13px;
        }

        .pg-card {
          background: #232633;
          border-radius: 14px;
          border: 1px solid #2f3441;
          overflow: hidden;
        }

        .pg-table {
          width: 100%;
          border-collapse: collapse;
        }

        .pg-table thead {
          background: #1e2028;
        }

        .pg-table th {
          padding: 12px;
          text-align: left;
          font-size: 11px;
          color: #6b7280;
          text-transform: uppercase;
        }

        .pg-table td {
          padding: 14px;
          border-top: 1px solid #2f3441;
          font-size: 13px;
        }

        .pg-table tr:hover td {
          background: #2a2f3e;
        }

        .pg-badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
        }

        .active {
          background: #1f3d2b;
          color: #4ade80;
        }

        .inactive {
          background: #3a1f24;
          color: #f87171;
        }

        .pg-actions {
          display: flex;
          gap: 6px;
        }

        .pg-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid #2f3441;
          background: #181a20;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #e5e7eb;
        }

        .pg-btn:hover {
          background: #232633;
        }

        .pg-btn.del:hover {
          background: #3a1f24;
          color: #f87171;
        }

        .pg-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .pg-modal {
          background: #232633;
          border-radius: 14px;
          border: 1px solid #2f3441;
          width: 100%;
          max-width: 480px;
          color: #fff;
        }

        .pg-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #2f3441;
        }

        .pg-modal-body {
          padding: 1.2rem;
          font-size: 14px;
        }

        .pg-modal-footer {
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          border-top: 1px solid #2f3441;
        }

        .pg-btn-cancel {
          border: 1px solid #2f3441;
          background: #181a20;
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
        }

        .pg-btn-danger {
          background: #ef4444;
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
        }
      `}</style>

      <div className="pg">
        <div className="pg-header">
          <div>
            <h1 className="pg-title">
              Compras
            </h1>

            <p className="pg-sub">
              {compras.length} registradas
            </p>
          </div>

          <Link
            to="/compras/nueva"
            className="pg-btn-new"
          >
            <Plus size={16} />
            Nueva Compra
          </Link>
        </div>

        <div className="pg-card">
          <table className="pg-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Proveedor</th>
                <th>Usuario</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {compras.length > 0 ? (
                compras.map((c) => (
                  <tr key={c.id_compra}>
                    <td>
                      #{c.id_compra}
                    </td>

                    <td>
                      {new Date(
                        c.fecha,
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      {c.proveedor?.nombre ||
                        '-'}
                    </td>

                    <td>
                      {c.usuario?.name ||
                        c.usuario?.nombre ||
                        '-'}
                    </td>

                    <td>
                      $
                      {Number(
                        c.total,
                      ).toLocaleString()}
                    </td>

                    <td>
                      <span
                        className={`pg-badge ${
                          c.status == 1
                            ? 'active'
                            : 'inactive'
                        }`}
                      >
                        {c.status == 1
                          ? 'Activa'
                          : 'Anulada'}
                      </span>
                    </td>

                    <td>
                      <div className="pg-actions">
                        <button
                          className="pg-btn"
                          onClick={() =>
                            verDetalle(
                              c.id_compra,
                            )
                          }
                        >
                          <Eye size={14} />
                        </button>

                        {c.status == 1 && (
                          <button
                            className="pg-btn del"
                            onClick={() =>
                              openEliminar(c)
                            }
                          >
                            <Trash2
                              size={14}
                            />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    No hay compras
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {modalDetalle && (
          <div
            className="pg-overlay"
            onClick={(e) =>
              e.target === e.currentTarget &&
              setModalDetalle(false)
            }
          >
            <div
              className="pg-modal"
              style={{ maxWidth: '600px' }}
            >
              <div className="pg-modal-header">
                <h3>
                  Detalle Compra #
                  {
                    compraDetalle?.id_compra
                  }
                </h3>

                <button
                  className="pg-btn"
                  onClick={() =>
                    setModalDetalle(false)
                  }
                >
                  <X size={16} />
                </button>
              </div>

              <div className="pg-modal-body">
                {compraDetalle?.detalles
                  ?.length > 0 ? (
                  <table
                    className="pg-table"
                  >
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>

                    <tbody>
                      {compraDetalle.detalles.map(
                        (
                          item,
                          index,
                        ) => (
                          <tr
                            key={index}
                          >
                            <td>
                              {item.producto
                                ?.nombre ||
                                '-'}
                            </td>

                            <td>
                              {
                                item.cantidad
                              }
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
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                ) : (
                  <div>
                    Sin detalles
                  </div>
                )}

                <div
                  style={{
                    marginTop: '20px',
                    textAlign: 'right',
                  }}
                >
                  <strong>
                    Total: $
                    {Number(
                      compraDetalle?.total ||
                        0,
                    ).toLocaleString()}
                  </strong>
                </div>
              </div>

              <div className="pg-modal-footer">
                <button
                  className="pg-btn-cancel"
                  onClick={() =>
                    setModalDetalle(false)
                  }
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {modalEliminar && (
          <div
            className="pg-overlay"
            onClick={(e) =>
              e.target === e.currentTarget &&
              setModalEliminar(false)
            }
          >
            <div className="pg-modal">
              <div className="pg-modal-header">
                <h3>Anular Compra</h3>

                <button
                  className="pg-btn"
                  onClick={() =>
                    setModalEliminar(false)
                  }
                >
                  <X size={16} />
                </button>
              </div>

              <div className="pg-modal-body">
                ¿Deseas anular la compra #

                <strong>
                  {
                    compraEliminar?.id_compra
                  }
                </strong>

                ?
              </div>

              <div className="pg-modal-footer">
                <button
                  className="pg-btn-cancel"
                  onClick={() =>
                    setModalEliminar(false)
                  }
                >
                  Cancelar
                </button>

                <button
                  className="pg-btn-danger"
                  onClick={
                    confirmarEliminar
                  }
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

const Plus = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line
      x1="12"
      y1="5"
      x2="12"
      y2="19"
    ></line>

    <line
      x1="5"
      y1="12"
      x2="19"
      y2="12"
    ></line>
  </svg>
)

export default Compras