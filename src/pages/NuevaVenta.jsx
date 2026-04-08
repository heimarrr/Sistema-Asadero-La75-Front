import { useEffect, useState } from "react";
import api from "../api";
import toast, { Toaster } from "react-hot-toast";

function NuevaVenta() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  // 🔥 Cargar productos disponibles
  useEffect(() => {
    const getProductos = async () => {
      try {
        const res = await api.get("/productos");
        setProductos(res.data.data);
      } catch {
        toast.error("Error al cargar productos");
      }
    };
    getProductos();
  }, []);

  // Producto seleccionado actual
  const productoActual = productos.find(
    (p) => p.id_producto === parseInt(productoSeleccionado)
  );

  // Filtrar productos por búsqueda
  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // ➕ Agregar al carrito
  const agregarAlCarrito = () => {
    if (!productoSeleccionado) {
      toast.error("Selecciona un producto");
      return;
    }

    const cant = parseInt(cantidad);
    if (cant < 1) {
      toast.error("La cantidad debe ser al menos 1");
      return;
    }

    if (productoActual && cant > productoActual.stock_actual) {
      toast.error(`Stock insuficiente. Disponible: ${productoActual.stock_actual}`);
      return;
    }

    // Si ya está en el carrito, sumar cantidad
    const existe = carrito.find(
      (item) => item.id_producto === parseInt(productoSeleccionado)
    );

    if (existe) {
      const nuevaCantidad = existe.cantidad + cant;
      if (productoActual && nuevaCantidad > productoActual.stock_actual) {
        toast.error(`Stock insuficiente. Disponible: ${productoActual.stock_actual}`);
        return;
      }
      setCarrito(
        carrito.map((item) =>
          item.id_producto === parseInt(productoSeleccionado)
            ? {
                ...item,
                cantidad: nuevaCantidad,
                subtotal: item.precio_unitario * nuevaCantidad,
              }
            : item
        )
      );
      toast.success("Cantidad actualizada");
    } else {
      setCarrito([
        ...carrito,
        {
          id_producto: productoActual.id_producto,
          nombre: productoActual.nombre,
          precio_unitario: productoActual.precio_venta,
          cantidad: cant,
          subtotal: productoActual.precio_venta * cant,
          stock_actual: productoActual.stock_actual,
        },
      ]);
      toast.success("Producto agregado");
    }

    // Reset
    setProductoSeleccionado("");
    setCantidad(1);
    setBusqueda("");
  };

  // 🗑️ Quitar del carrito
  const quitarDelCarrito = (id_producto) => {
    setCarrito(carrito.filter((item) => item.id_producto !== id_producto));
  };

  // Cambiar cantidad directamente en el carrito
  const cambiarCantidadCarrito = (id_producto, nuevaCantidad) => {
    const cant = parseInt(nuevaCantidad);
    if (cant < 1) return;

    const item = carrito.find((i) => i.id_producto === id_producto);
    if (item && cant > item.stock_actual) {
      toast.error(`Stock insuficiente. Disponible: ${item.stock_actual}`);
      return;
    }

    setCarrito(
      carrito.map((item) =>
        item.id_producto === id_producto
          ? { ...item, cantidad: cant, subtotal: item.precio_unitario * cant }
          : item
      )
    );
  };

  // 💰 Total del carrito
  const total = carrito.reduce((acc, item) => acc + item.subtotal, 0);

  // ✅ Confirmar venta
  const confirmarVenta = async () => {
    if (carrito.length === 0) {
      toast.error("Agrega al menos un producto");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        productos: carrito.map((item) => ({
          id_producto: item.id_producto,
          cantidad: item.cantidad,
        })),
      };

      await api.post("/ventas", payload);
      toast.success("¡Venta registrada correctamente! 🎉");
      setCarrito([]);

      // Redirigir al historial después de 1.5s
      setTimeout(() => {
        window.location.href = "/ventas";
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al registrar la venta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <Toaster />

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Nueva Venta 🛒</h1>
          <a href="/ventas" className="btn btn-outline">
            ← Historial
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ─── PANEL IZQUIERDO: Selector de productos ─── */}
          <div className="bg-base-100 rounded-xl shadow p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Agregar Producto</h2>

            {/* Búsqueda */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Buscar producto</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Escribe el nombre..."
                value={busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value);
                  setProductoSeleccionado("");
                }}
              />
            </div>

            {/* Select de producto */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Seleccionar</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={productoSeleccionado}
                onChange={(e) => setProductoSeleccionado(e.target.value)}
              >
                <option value="">-- Selecciona un producto --</option>
                {productosFiltrados.map((p) => (
                  <option
                    key={p.id_producto}
                    value={p.id_producto}
                    disabled={p.stock_actual === 0}
                  >
                    {p.nombre} — ${Number(p.precio_venta).toLocaleString()} (Stock: {p.stock_actual})
                  </option>
                ))}
              </select>
            </div>

            {/* Info del producto seleccionado */}
            {productoActual && (
              <div className="alert alert-info">
                <div>
                  <p className="font-bold">{productoActual.nombre}</p>
                  <p>Precio: ${Number(productoActual.precio_venta).toLocaleString()}</p>
                  <p>Stock disponible: <strong>{productoActual.stock_actual}</strong></p>
                </div>
              </div>
            )}

            {/* Cantidad */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Cantidad</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                min="1"
                max={productoActual?.stock_actual || 9999}
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
            </div>

            <button
              className="btn btn-primary w-full"
              onClick={agregarAlCarrito}
              disabled={!productoSeleccionado}
            >
              ➕ Agregar al carrito
            </button>
          </div>

          {/* ─── PANEL DERECHO: Carrito ─── */}
          <div className="bg-base-100 rounded-xl shadow p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">
              Carrito{" "}
              <span className="badge badge-primary ml-1">{carrito.length}</span>
            </h2>

            {carrito.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                <span className="text-5xl mb-3">🛒</span>
                <p>El carrito está vacío</p>
              </div>
            ) : (
              <>
                {/* Lista de productos en carrito */}
                <div className="overflow-x-auto">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cant.</th>
                        <th>Subtotal</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {carrito.map((item) => (
                        <tr key={item.id_producto}>
                          <td className="font-medium">{item.nombre}</td>
                          <td>${Number(item.precio_unitario).toLocaleString()}</td>
                          <td>
                            <input
                              type="number"
                              className="input input-bordered input-xs w-16"
                              min="1"
                              max={item.stock_actual}
                              value={item.cantidad}
                              onChange={(e) =>
                                cambiarCantidadCarrito(item.id_producto, e.target.value)
                              }
                            />
                          </td>
                          <td className="font-semibold">
                            ${Number(item.subtotal).toLocaleString()}
                          </td>
                          <td>
                            <button
                              className="btn btn-xs btn-error btn-outline"
                              onClick={() => quitarDelCarrito(item.id_producto)}
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Divider */}
                <div className="divider my-0" />

                {/* Total */}
                <div className="flex justify-between items-center text-2xl font-bold">
                  <span>Total:</span>
                  <span className="text-primary">${Number(total).toLocaleString()}</span>
                </div>

                {/* Botones */}
                <div className="flex gap-3 mt-2">
                  <button
                    className="btn btn-outline btn-error flex-1"
                    onClick={() => setCarrito([])}
                  >
                    Limpiar
                  </button>

                  <button
                    className="btn btn-success flex-1"
                    onClick={() =>
                      document.getElementById("modal_confirmar").showModal()
                    }
                    disabled={loading}
                  >
                    ✅ Confirmar Venta
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ✅ MODAL CONFIRMAR VENTA */}
      <dialog id="modal_confirmar" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Confirmar Venta</h3>

          <div className="space-y-1 mb-4">
            {carrito.map((item) => (
              <div key={item.id_producto} className="flex justify-between text-sm">
                <span>{item.nombre} x{item.cantidad}</span>
                <span>${Number(item.subtotal).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="divider" />

          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span className="text-success">${Number(total).toLocaleString()}</span>
          </div>

          <div className="modal-action">
            <button
              className="btn"
              onClick={() => document.getElementById("modal_confirmar").close()}
              disabled={loading}
            >
              Cancelar
            </button>

            <button
              className="btn btn-success"
              onClick={confirmarVenta}
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "💰 Registrar Venta"
              )}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default NuevaVenta;