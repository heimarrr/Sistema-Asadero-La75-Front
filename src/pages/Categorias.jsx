import { useEffect, useState } from "react";
import api from "../api";
import toast, { Toaster } from "react-hot-toast";

function Categorias() {
  const [categorias, setCategorias] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    status: true,
  });

  const [editando, setEditando] = useState(false);
  const [idActual, setIdActual] = useState(null);

  // 🔥 Obtener categorías
  const getCategorias = async () => {
    try {
      const res = await api.get("/categorias");
      setCategorias(res.data.data);
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Error al cargar categorías");
    }
  };

  useEffect(() => {
    getCategorias();
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
      descripcion: "",
      status: true,
    });

    setEditando(false);
    document.getElementById("modal_categoria").showModal();
  };

  // 🧩 Editar
  const openEdit = (c) => {
    setForm({
      nombre: c.nombre,
      descripcion: c.descripcion || "",
      status: c.status,
    });

    setIdActual(c.id_categoria);
    setEditando(true);
    document.getElementById("modal_categoria").showModal();
  };

  // 🧩 Guardar
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        await api.put(`/categorias/${idActual}`, form);
        toast.success("Categoría actualizada");
      } else {
        await api.post("/categorias", form);
        toast.success("Categoría creada");
      }

      document.getElementById("modal_categoria").close();
      getCategorias();

    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Error");
    }
  };

  // 🧩 Eliminar
  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar categoría?")) return;

    try {
      await api.delete(`/categorias/${id}`);
      toast.success("Categoría eliminada");
      getCategorias();
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "No se puede eliminar");
    }
  };

  // 🧩 Toggle estado
  const toggleEstado = async (id) => {
    try {
      await api.post(`/categorias/${id}/toggle-estado`);
      toast.success("Estado actualizado");
      getCategorias();
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
          <h1 className="text-3xl font-bold">Categorías 🏷️</h1>

          <button className="btn btn-primary" onClick={openCreate}>
            + Nueva Categoría
          </button>
        </div>

        {/* TABLA */}
        <div className="overflow-x-auto bg-base-100 p-4 rounded-xl shadow">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {categorias.map((c) => (
                <tr key={c.id_categoria}>
                  <td>{c.id_categoria}</td>
                  <td>{c.nombre}</td>
                  <td>{c.descripcion || "-"}</td>

                  <td>
                    <span className={`badge ${c.status ? "badge-success" : "badge-error"}`}>
                      {c.status ? "Activo" : "Inactivo"}
                    </span>
                  </td>

                  <td className="flex gap-2">

                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => openEdit(c)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => toggleEstado(c.id_categoria)}
                    >
                      Estado
                    </button>

                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(c.id_categoria)}
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
        <dialog id="modal_categoria" className="modal">
          <div className="modal-box">

            <h3 className="font-bold text-lg mb-4">
              {editando ? "Editar Categoría" : "Nueva Categoría"}
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
                name="descripcion"
                placeholder="Descripción"
                className="input input-bordered w-full"
                onChange={handleChange}
                value={form.descripcion}
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
                  onClick={() => document.getElementById("modal_categoria").close()}
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

export default Categorias;