import { useEffect, useState } from "react";
import api from "../api";

function Home() {
  const [usuarios, setUsuarios] = useState(0);

  useEffect(() => {
    api.get("/usuarios")
      .then(res => {
        setUsuarios(res.data.usuarios.length);
      })
      .catch(err => console.error(err));
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

        {/* Ventas (placeholder) */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Ventas</h2>
            <p className="text-4xl font-bold">0</p>
          </div>
        </div>

        {/* Productos (placeholder) */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Productos</h2>
            <p className="text-4xl font-bold">0</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;