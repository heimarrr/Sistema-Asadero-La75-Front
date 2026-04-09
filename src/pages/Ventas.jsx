import { useEffect, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";
import { Eye, Trash2, X, DollarSign, Tag } from "lucide-react";

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [ventaDetalle, setVentaDetalle] = useState(null);
  const [ventaEliminar, setVentaEliminar] = useState(null);

  const [modalDetalle, setModalDetalle] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const getVentas = async () => {
    try {
      const res = await api.get("/ventas");
      setVentas(res.data.data);
    } catch {
      toast.error("Error al cargar ventas");
    }
  };

  useEffect(() => {
    getVentas();
  }, []);

  const verDetalle = async (id) => {
    try {
      const res = await api.get(`/ventas/${id}`);
      setVentaDetalle(res.data.data);
      setModalDetalle(true);
    } catch {
      toast.error("Error al obtener detalle");
    }
  };

  const openEliminar = (venta) => {
    setVentaEliminar(venta);
    setModalEliminar(true);
  };

  const confirmarEliminar = async () => {
    try {
      await api.delete(`/ventas/${ventaEliminar.id_venta}`);
      toast.success("Venta anulada");
      setModalEliminar(false);
      getVentas();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  return (
    <>
      <style>{`
        .pg { font-family: 'Inter', sans-serif; color: #e5e7eb; }
        .pg-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .pg-title { font-size: 1.6rem; font-weight: 600; color: #fff; }
        .pg-sub { font-size: 13px; color: #6b7280; }

        .pg-btn-new {
          display: flex; align-items: center; gap: 8px; padding: 10px 16px;
          border-radius: 10px; background: #6366f1; color: white; border: none; cursor: pointer;
          text-decoration: none; font-size: 13px;
        }

        .pg-card { background: #232633; border-radius: 14px; border: 1px solid #2f3441; overflow: hidden; }
        .pg-table { width: 100%; border-collapse: collapse; }
        .pg-table thead { background: #1e2028; }
        .pg-table th { padding: 12px; text-align: left; font-size: 11px; color: #6b7280; text-transform: uppercase; }
        .pg-table td { padding: 14px; border-top: 1px solid #2f3441; font-size: 13px; }
        .pg-table tr:hover td { background: #2a2f3e; }

        .pg-badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; }
        .active { background: #1f3d2b; color: #4ade80; }
        .inactive { background: #3a1f24; color: #f87171; }

        .pg-actions { display: flex; gap: 6px; }
        .pg-btn {
          width: 32px; height: 32px; border-radius: 8px; border: 1px solid #2f3441;
          background: #181a20; display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #e5e7eb;
        }
        .pg-btn:hover { background: #232633; }
        .pg-btn.del:hover { background: #3a1f24; color: #f87171; }

        /* MODALES (Copiados de Categorías) */
        .pg-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.7);
          display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
        .pg-modal {
          background: #232633; border-radius: 14px; border: 1px solid #2f3441;
          width: 100%; max-width: 480px; color: #fff;
        }
        .pg-modal-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1rem; border-bottom: 1px solid #2f3441;
        }
        .pg-modal-body { padding: 1.2rem; font-size: 14px; }
        .pg-modal-footer { padding: 1rem; display: flex; justify-content: flex-end; gap: 8px; border-top: 1px solid #2f3441; }
        
        .pg-btn-save { background: #6366f1; color: white; padding: 8px 16px; border-radius: 8px; border:none; cursor:pointer; }
        .pg-btn-cancel { border: 1px solid #2f3441; background: #181a20; color:white; padding: 8px 16px; border-radius: 8px; cursor:pointer; }
        .pg-btn-danger { background: #ef4444; color: white; padding: 8px 16px; border-radius: 8px; border:none; cursor:pointer; }
        
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #2f3441; }
      `}</style>

      <div className="pg">
        <div className="pg-header">
          <div>
            <h1 className="pg-title">Ventas</h1>
            <p className="pg-sub">{ventas.length} registradas</p>
          </div>
          <a href="/ventas/nueva" className="pg-btn-new">
            <Plus size={16} /> Nueva Venta
          </a>
        </div>

        <div className="pg-card">
          <table className="pg-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Usuario</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((v) => (
                <tr key={v.id_venta}>
                  <td>#{v.id_venta}</td>
                  <td>{new Date(v.fecha).toLocaleDateString()}</td>
                  <td>{v.usuario?.nombre || "-"}</td>
                  <td>${Number(v.total).toLocaleString()}</td>
                  <td>
                    <span className={`pg-badge ${v.status == 1 ? "active" : "inactive"}`}>
                      {v.status == 1 ? "Activa" : "Anulada"}
                    </span>
                  </td>
                  <td>
                    <div className="pg-actions">
                      <button className="pg-btn" onClick={() => verDetalle(v.id_venta)}>
                        <Eye size={14} />
                      </button>
                      {v.status == 1 && (
                        <button className="pg-btn del" onClick={() => openEliminar(v)}>
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL DETALLE */}
{modalDetalle && (
  <div className="pg-overlay" onClick={(e) => e.target === e.currentTarget && setModalDetalle(false)}>
    <div className="pg-modal" style={{ maxWidth: '600px' }}> {/* Un poco más ancho para la tabla */}
      <div className="pg-modal-header">
        <h3 style={{ margin: 0 }}>Detalle de Venta #{ventaDetalle?.id_venta}</h3>
        <button className="pg-btn" onClick={() => setModalDetalle(false)}>
          <X size={16} />
        </button>
      </div>

      <div className="pg-modal-body">
        {ventaDetalle ? (
          <>
            {/* Información General */}
            <div style={{ marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <p style={{ color: '#6b7280', fontSize: '11px', margin: 0, textTransform: 'uppercase' }}>Vendedor</p>
                <p style={{ margin: 0, fontWeight: '500' }}>{ventaDetalle.usuario?.nombre || "N/A"}</p>
              </div>
              <div>
                <p style={{ color: '#6b7280', fontSize: '11px', margin: 0, textTransform: 'uppercase' }}>Fecha y Hora</p>
                <p style={{ margin: 0 }}>
                  {new Date(ventaDetalle.fecha).toLocaleDateString()} - {new Date(ventaDetalle.fecha).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            </div>

            {/* Tabla de Productos */}
            <div style={{ background: '#1e2028', borderRadius: '10px', border: '1px solid #2f3441', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#2a2f3e' }}>
                    <th style={{ padding: '12px 10px', textAlign: 'left', color: '#9ca3af', fontSize: '11px' }}>PRODUCTO</th>
                    <th style={{ padding: '12px 10px', textAlign: 'center', color: '#9ca3af', fontSize: '11px' }}>CANT.</th>
                    <th style={{ padding: '12px 10px', textAlign: 'right', color: '#9ca3af', fontSize: '11px' }}>PRECIO</th>
                    <th style={{ padding: '12px 10px', textAlign: 'right', color: '#9ca3af', fontSize: '11px' }}>SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {/* VALIDACIÓN DOBLE: Probamos con detalle_ventas (snake_case) y detalleVentas (camelCase) */}
                  {(ventaDetalle.detalle_ventas || ventaDetalle.detalleVentas)?.length > 0 ? (
                    (ventaDetalle.detalle_ventas || ventaDetalle.detalleVentas).map((item, index) => (
                      <tr key={index} style={{ borderTop: '1px solid #2f3441' }}>
                        <td style={{ padding: '10px' }}>
                          <div style={{ fontWeight: '500' }}>{item.producto?.nombre || "Producto no encontrado"}</div>
                          <div style={{ fontSize: '10px', color: '#6b7280' }}>ID: {item.id_producto}</div>
                        </td>
                        <td style={{ padding: '10px', textAlign: 'center' }}>
                          {item.cantidad}
                        </td>
                        <td style={{ padding: '10px', textAlign: 'right' }}>
                          ${Number(item.precio_unitario).toLocaleString()}
                        </td>
                        <td style={{ padding: '10px', textAlign: 'right', color: '#4ade80', fontWeight: '500' }}>
                          ${Number(item.subtotal).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
                        <div style={{ marginBottom: '8px' }}>⚠️ No se encontraron detalles</div>
                        <small>Revisa que la relación 'detalleVentas' esté definida en el modelo Venta</small>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Total Final */}
            <div style={{ marginTop: '1.5rem', textAlign: 'right', borderTop: '2px solid #2f3441', paddingTop: '15px' }}>
              <p style={{ color: '#6b7280', fontSize: '11px', margin: 0 }}>TOTAL PAGADO</p>
              <h2 style={{ margin: 0, color: '#6366f1', fontSize: '24px' }}>
                ${Number(ventaDetalle.total).toLocaleString()}
              </h2>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>Cargando información...</div>
        )}
      </div>

      <div className="pg-modal-footer">
        <button className="pg-btn-cancel" onClick={() => setModalDetalle(false)}>
          Cerrar
        </button>
      </div>
    </div>
  </div>
)}

        {/* MODAL ANULAR */}
        {modalEliminar && (
          <div className="pg-overlay" onClick={(e) => e.target === e.currentTarget && setModalEliminar(false)}>
            <div className="pg-modal">
              <div className="pg-modal-header">
                <h3>Anular Venta</h3>
                <button className="pg-btn" onClick={() => setModalEliminar(false)}><X size={16} /></button>
              </div>
              <div className="pg-modal-body">
                ¿Estás seguro que deseas anular la venta <strong>#{ventaEliminar?.id_venta}</strong>? 
                Esta acción devolverá los productos al inventario.
              </div>
              <div className="pg-modal-footer">
                <button className="pg-btn-cancel" onClick={() => setModalEliminar(false)}>Cancelar</button>
                <button className="pg-btn-danger" onClick={confirmarEliminar}>Confirmar Anulación</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const Plus = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

export default Ventas;