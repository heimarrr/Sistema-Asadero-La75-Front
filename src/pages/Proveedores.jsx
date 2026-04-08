import { useEffect, useState } from "react";
import api from "../api";
import toast, { Toaster } from "react-hot-toast";

function Proveedores() {
  const [proveedores, setProveedores] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    correo: "",
    status: true,
  });

  const [editando, setEditando] = useState(false);
  const [idActual, setIdActual] = useState(null);

  // 🔥 Obtener proveedores
  const getProveedores = async () => {
    try {
      const res = await api.get("/proveedores");
      setProveedores(res.data.data);
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Error al cargar proveedores");
    }
  };

  useEffect(() => {
    getProveedores();
  }, []);

  // 🧩 Manejar inputs
  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "status") {
      value = value === "1";
    }

    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  // 🧩 Crear
  const openCreate = () => {
    setForm({
      nombre: "",
      telefono: "",
      direccion: "",
      correo: "",
      status: true,
    });

    setEditando(false);
    document.getElementById("modal_proveedor").showModal();
  };

  // 🧩 Editar
  const openEdit = (p) => {
    setForm({
      nombre: p.nombre,
      telefono: p.telefono || "",
      direccion: p.direccion || "",
      correo: p.correo || "",
      status: p.status,
    });

    setIdActual(p.id_proveedor);
    setEditando(true);
    document.getElementById("modal_proveedor").showModal();
  };

  // 🧩 Guardar
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        await api.put(`/proveedores/${idActual}`, form);
        toast.success("Proveedor actualizado");
      } else {
        await api.post("/proveedores", form);
        toast.success("Proveedor creado");
      }

      document.getElementById("modal_proveedor").close();
      getProveedores();

    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Error");
    }
  };

  // 🧩 Eliminar
  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar proveedor?")) return;

    try {
      await api.delete(`/proveedores/${id}`);
      toast.success("Proveedor eliminado");
      getProveedores();
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Error al eliminar");
    }
  };

  // 🧩 Toggle estado
  const toggleEstado = async (id) => {
    try {
      await api.post(`/proveedores/${id}/toggle-estado`);
      toast.success("Estado actualizado");
      getProveedores();
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Error al cambiar estado");
    }
  };

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <Toaster />

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Proveedores 📦</h1>

          <button className="btn btn-primary" onClick={openCreate}>
            + Nuevo Proveedor
          </button>
        </div>

        {/* TABLA */}
        <div className="overflow-x-auto bg-base-100 p-4 rounded-xl shadow">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Dirección</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {proveedores.map((p) => (
                <tr key={p.id_proveedor}>
                  <td>{p.id_proveedor}</td>
                  <td>{p.nombre}</td>
                  <td>{p.telefono || "-"}</td>
                  <td>{p.correo || "-"}</td>
                  <td>{p.direccion || "-"}</td>

                  <td>
                    <span className={`badge ${p.status ? "badge-success" : "badge-error"}`}>
                      {p.status ? "Activo" : "Inactivo"}
                    </span>
                  </td>

                  <td className="flex gap-2">

                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => openEdit(p)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => toggleEstado(p.id_proveedor)}
                    >
                      Estado
                    </button>

                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(p.id_proveedor)}
                    >
                      Eliminar
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        <dialog id="modal_proveedor" className="modal">
          <div className="modal-box">

            <h3 className="font-bold text-lg mb-4">
              {editando ? "Editar Proveedor" : "Nuevo Proveedor"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">

              <input
                name="nombre"
                placeholder="Nombre"
                className="input input-bordered w-full"
                onChange={handleChange}
                value={form.nombre}
              />

              <input
                name="telefono"
                placeholder="Teléfono"
                className="input input-bordered w-full"
                onChange={handleChange}
                value={form.telefono}
              />

              <input
                name="correo"
                placeholder="Correo"
                className="input input-bordered w-full"
                onChange={handleChange}
                value={form.correo}
              />

              <input
                name="direccion"
                placeholder="Dirección"
                className="input input-bordered w-full"
                onChange={handleChange}
                value={form.direccion}
              />

              <select
                name="status"
                className="select select-bordered w-full"
                onChange={handleChange}
                value={form.status ? "1" : "0"}
              >
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>

              <div className="flex justify-end gap-2 mt-4">
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>

                <button
                  type="button"
                  className="btn"
                  onClick={() => document.getElementById("modal_proveedor").close()}
                >
                  Cancelar
                </button>
              </div>

            </form>

          </div>
        </dialog>

      </div>
    </div>
  );
}

export default Proveedores;