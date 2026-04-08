import { useEffect, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

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

      } catch (error) {
        console.log(error.response?.data);
        toast.error("Error al cargar datos del dashboard");
      }
    };

    getData();
  }, []);

  return (
    <div className="p-6 bg-base-200 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Dashboard 📊
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Usuarios */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Usuarios</h2>
            <p className="text-4xl font-bold">{usuarios}</p>
          </div>
        </div>

        {/* Ventas */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Ventas</h2>
            <p className="text-4xl font-bold">{ventas}</p>
          </div>
        </div>

        {/* Productos */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Productos</h2>
            <p className="text-4xl font-bold">{productos}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;