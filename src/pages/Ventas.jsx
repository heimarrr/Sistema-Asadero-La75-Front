import { useEffect, useState } from "react";
import api from "../api";
import toast, { Toaster } from "react-hot-toast";

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [ventaDetalle, setVentaDetalle] = useState(null);
  const [ventaEliminar, setVentaEliminar] = useState(null);

  // 🔥 Obtener ventas
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

  // 🔍 Ver detalle
  const verDetalle = async (id) => {
    try {
      const res = await api.get(`/ventas/${id}`);
      setVentaDetalle(res.data.data);
      document.getElementById("modal_detalle").showModal();
    } catch {
      toast.error("Error al obtener detalle");
    }
  };

  // ❌ Abrir modal eliminar
  const openEliminar = (venta) => {
    setVentaEliminar(venta);
    document.getElementById("modal_eliminar").showModal();
  };

  // ❌ Confirmar anulación
  const confirmarEliminar = async () => {
    try {
      await api.delete(`/ventas/${ventaEliminar.id_venta}`);
      toast.success("Venta anulada");
      getVentas();
      document.getElementById("modal_eliminar").close();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <Toaster />

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gestión de Ventas 💰</h1>

          <a href="/ventas/nueva" className="btn btn-primary">
            + Nueva Venta
          </a>
        </div>

        {/* TABLA */}
        <div className="overflow-x-auto bg-base-100 p-4 rounded-xl shadow">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Usuario</th>
                <th>Total</th>
                <th className="text-center">Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {ventas.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500">
                    No hay ventas registradas
                  </td>
                </tr>
              ) : (
                ventas.map((v) => (
                  <tr key={v.id_venta}>
                    <td>{v.id_venta}</td>

                    <td>
                      {new Date(v.fecha).toLocaleDateString()}
                    </td>

                    <td>{v.usuario?.nombre || "N/A"}</td>

                    <td>${Number(v.total).toLocaleString()}</td>

                    <td className="text-center">
                      <span className={`badge ${v.status ? "badge-success" : "badge-error"}`}>
                        {v.status ? "Activa" : "Anulada"}
                      </span>
                    </td>

                    <td className="text-center">
                      <div className="flex justify-center gap-2">

                        <button
                          className="btn btn-sm btn-info"
                          onClick={() => verDetalle(v.id_venta)}
                        >
                          Ver
                        </button>

                        {v.status === 1 ? (
                          <button
                            className="btn btn-sm btn-error"
                            onClick={() => openEliminar(v)}
                          >
                            Anular
                          </button>
                        ) : (
                          <button className="btn btn-sm btn-disabled">
                            Anulada
                          </button>
                        )}

                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 🔍 MODAL DETALLE */}
        <dialog id="modal_detalle" className="modal">
          <div className="modal-box">

            <h3 className="font-bold text-lg mb-4">
              Detalle de Venta
            </h3>

            {ventaDetalle && (
              <div>

                <p><strong>ID:</strong> {ventaDetalle.id_venta}</p>
                <p><strong>Usuario:</strong> {ventaDetalle.usuario?.nombre}</p>
                <p><strong>Fecha:</strong> {ventaDetalle.fecha}</p>

                <div className="mt-4">
                  <h4 className="font-bold mb-2">Productos</h4>

                  {ventaDetalle.detalle_ventas?.map((d, i) => (
                    <div key={i} className="flex justify-between border-b py-1">
                      <span>{d.producto?.nombre}</span>
                      <span>{d.cantidad} x ${d.precio_unitario}</span>
                      <span>${d.subtotal}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-xl font-bold">
                  Total: ${ventaDetalle.total}
                </div>

              </div>
            )}

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => document.getElementById("modal_detalle").close()}
              >
                Cerrar
              </button>
            </div>

          </div>
        </dialog>

        {/* ❌ MODAL ANULAR */}
        <dialog id="modal_eliminar" className="modal">
          <div className="modal-box">

            <h3 className="font-bold text-lg text-error">
              Confirmar Anulación
            </h3>

            {ventaEliminar && (
              <p className="py-4">
                ¿Seguro que deseas anular la venta{" "}
                <strong>#{ventaEliminar.id_venta}</strong>?
                <br />
                <span className="text-error">
                  Esto afectará el inventario.
                </span>
              </p>
            )}

            <div className="modal-action">
              <button className="btn" onClick={() => document.getElementById("modal_eliminar").close()}>
                Cancelar
              </button>

              <button className="btn btn-error" onClick={confirmarEliminar}>
                Sí, Anular
              </button>
            </div>

          </div>
        </dialog>

      </div>
    </div>
  );
}

export default Ventas;