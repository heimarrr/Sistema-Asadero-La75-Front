import { useEffect, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";
import { Users, ShoppingCart, Package } from "lucide-react";

function Home() {
  const [usuarios, setUsuarios] = useState(0);
  const [ventas, setVentas] = useState(0);
  const [productos, setProductos] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const resUsuarios = await api.get("/usuarios");
        setUsuarios(resUsuarios.data.data.length);

        try {
          const resVentas = await api.get("/ventas");
          setVentas(resVentas.data.data.length);
        } catch {
          setVentas(0);
        }

        try {
          const resProductos = await api.get("/productos");
          setProductos(resProductos.data.data.length);
        } catch {
          setProductos(0);
        }
      } catch {
        toast.error("Error al cargar datos");
      }
    };

    getData();
  }, []);

  return (
    <>
      <style>{`
        .pg { font-family: 'Inter'; color: #e5e7eb; }

        .pg-header {
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

        .pg-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .pg-card {
          background: #232633;
          border: 1px solid #2f3441;
          border-radius: 14px;
          padding: 16px;
          transition: all 0.2s ease;
        }

        .pg-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }

        .pg-card-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .pg-icon {
          padding: 8px;
          border-radius: 10px;
          background: #181a20;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pg-label {
          font-size: 12px;
          color: #6b7280;
        }

        .pg-value {
          font-size: 2rem;
          font-weight: bold;
          color: #fff;
          margin-top: 4px;
        }

        .users { color: #60a5fa; }
        .ventas { color: #22c55e; }
        .productos { color: #f59e0b; }

      `}</style>

      <div className="pg">

        {/* HEADER */}
        <div className="pg-header">
          <h1 className="pg-title">Dashboard</h1>
          <p className="pg-sub">Resumen general del sistema</p>
        </div>

        {/* CARDS */}
        <div className="pg-grid">

          {/* Usuarios */}
          <div className="pg-card">
            <div className="pg-card-top">
              <div className="pg-icon users">
                <Users size={18} />
              </div>
            </div>
            <div className="pg-label">Usuarios</div>
            <div className="pg-value">{usuarios}</div>
          </div>

          {/* Ventas */}
          <div className="pg-card">
            <div className="pg-card-top">
              <div className="pg-icon ventas">
                <ShoppingCart size={18} />
              </div>
            </div>
            <div className="pg-label">Ventas</div>
            <div className="pg-value">{ventas}</div>
          </div>

          {/* Productos */}
          <div className="pg-card">
            <div className="pg-card-top">
              <div className="pg-icon productos">
                <Package size={18} />
              </div>
            </div>
            <div className="pg-label">Productos</div>
            <div className="pg-value">{productos}</div>
          </div>

        </div>

      </div>
    </>
  );
}

export default Home;