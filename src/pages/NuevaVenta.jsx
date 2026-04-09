import { useEffect, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";
import { Plus, Trash2, ShoppingCart, X } from "lucide-react";

function NuevaVenta() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const productoActual = productos.find(
    (p) => p.id_producto === parseInt(productoSeleccionado)
  );

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregarAlCarrito = () => {
    if (!productoSeleccionado) return toast.error("Selecciona un producto");

    const cant = parseInt(cantidad);
    if (cant < 1) return toast.error("Cantidad inválida");

    if (productoActual && cant > productoActual.stock_actual) {
      return toast.error(`Stock: ${productoActual.stock_actual}`);
    }

    const existe = carrito.find(
      (i) => i.id_producto === parseInt(productoSeleccionado)
    );

    if (existe) {
      const nuevaCantidad = existe.cantidad + cant;
      if (nuevaCantidad > productoActual.stock_actual) {
        return toast.error("Stock insuficiente");
      }

      setCarrito(
        carrito.map((i) =>
          i.id_producto === existe.id_producto
            ? {
                ...i,
                cantidad: nuevaCantidad,
                subtotal: i.precio_unitario * nuevaCantidad,
              }
            : i
        )
      );
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
    }

    setProductoSeleccionado("");
    setCantidad(1);
    setBusqueda("");
  };

  const quitar = (id) => {
    setCarrito(carrito.filter((i) => i.id_producto !== id));
  };

  const cambiarCantidad = (id, val) => {
    const cant = parseInt(val);
    if (cant < 1) return;

    const item = carrito.find((i) => i.id_producto === id);
    if (cant > item.stock_actual) {
      return toast.error("Stock insuficiente");
    }

    setCarrito(
      carrito.map((i) =>
        i.id_producto === id
          ? { ...i, cantidad: cant, subtotal: i.precio_unitario * cant }
          : i
      )
    );
  };

  const total = carrito.reduce((acc, i) => acc + i.subtotal, 0);

  const confirmarVenta = async () => {
    setLoading(true);
    try {
      await api.post("/ventas", {
        productos: carrito.map((i) => ({
          id_producto: i.id_producto,
          cantidad: i.cantidad,
        })),
      });

      toast.success("Venta registrada 🔥");
      setCarrito([]);
      setModalOpen(false);
    } catch {
      toast.error("Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .pg { font-family: 'Inter'; color: #e5e7eb; }

        .pg-header {
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:2rem;
        }

        .pg-title { font-size:1.6rem; font-weight:600; color:#fff; }

        .pg-grid {
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap:20px;
        }

        .pg-card {
          background:#232633;
          border:1px solid #2f3441;
          border-radius:14px;
          padding:16px;
          display:flex;
          flex-direction:column;
          gap:12px;
        }

        .pg-input, .pg-select {
          padding:10px;
          border-radius:8px;
          border:1px solid #2f3441;
          background:#181a20;
          color:white;
          width:100%;
        }

        .pg-btn {
          padding:10px;
          border-radius:8px;
          border:none;
          cursor:pointer;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:6px;
        }

        .pg-btn-primary { background:#6366f1; }
        .pg-btn-success { background:#22c55e; }
        .pg-btn-danger { background:#ef4444; }

        .pg-table { width:100%; border-collapse:collapse; }

        .pg-table th {
          text-align:left;
          font-size:12px;
          color:#6b7280;
        }

        .pg-table td {
          padding:10px;
          border-top:1px solid #2f3441;
        }

        .pg-total {
          display:flex;
          justify-content:space-between;
          font-size:1.2rem;
          font-weight:600;
          margin-top:10px;
        }

        .pg-overlay {
          position:fixed;
          inset:0;
          background:rgba(0,0,0,.6);
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .pg-modal {
          background:#232633;
          border-radius:14px;
          width:400px;
          padding:16px;
        }

        .pg-modal-header {
          display:flex;
          justify-content:space-between;
          margin-bottom:10px;
        }

      `}</style>

      <div className="pg">
        <div className="pg-header">
          <h1 className="pg-title">Nueva Venta</h1>
        </div>

        <div className="pg-grid">

          {/* IZQUIERDA */}
          <div className="pg-card">
            <h3>Agregar producto</h3>

            <input
              className="pg-input"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            <select
              className="pg-select"
              value={productoSeleccionado}
              onChange={(e) => setProductoSeleccionado(e.target.value)}
            >
              <option value="">Seleccionar</option>
              {productosFiltrados.map(p => (
                <option key={p.id_producto} value={p.id_producto}>
                  {p.nombre} - ${p.precio_venta}
                </option>
              ))}
            </select>

            {productoActual && (
              <div style={{fontSize:"13px", color:"#9ca3af"}}>
                Stock: {productoActual.stock_actual}
              </div>
            )}

            <input
              type="number"
              className="pg-input"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />

            <button className="pg-btn pg-btn-primary" onClick={agregarAlCarrito}>
              <Plus size={16}/> Agregar
            </button>
          </div>

          {/* DERECHA */}
          <div className="pg-card">
            <h3>Carrito ({carrito.length})</h3>

            {carrito.length === 0 ? (
              <p style={{color:"#6b7280"}}>Carrito vacío</p>
            ) : (
              <>
                <table className="pg-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cant</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map(i => (
                      <tr key={i.id_producto}>
                        <td>{i.nombre}</td>
                        <td>
                          <input
                            type="number"
                            value={i.cantidad}
                            className="pg-input"
                            style={{width:"60px"}}
                            onChange={(e)=>cambiarCantidad(i.id_producto,e.target.value)}
                          />
                        </td>
                        <td>${i.subtotal}</td>
                        <td>
                          <button onClick={()=>quitar(i.id_producto)}>
                            <Trash2 size={14}/>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="pg-total">
                  <span>Total</span>
                  <span>${total}</span>
                </div>

                <button
                  className="pg-btn pg-btn-success"
                  onClick={()=>setModalOpen(true)}
                >
                  Confirmar venta
                </button>
              </>
            )}
          </div>
        </div>

        {/* MODAL */}
        {modalOpen && (
          <div className="pg-overlay">
            <div className="pg-modal">
              <div className="pg-modal-header">
                <h3>Confirmar</h3>
                <button onClick={()=>setModalOpen(false)}><X size={16}/></button>
              </div>

              {carrito.map(i => (
                <div key={i.id_producto}>
                  {i.nombre} x{i.cantidad}
                </div>
              ))}

              <div className="pg-total">
                <span>Total</span>
                <span>${total}</span>
              </div>

              <button className="pg-btn pg-btn-success" onClick={confirmarVenta}>
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default NuevaVenta;