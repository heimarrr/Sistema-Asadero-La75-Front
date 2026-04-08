import { useEffect, useState } from "react";
import api from "../api";
import toast, { Toaster } from "react-hot-toast";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    stock_actual: 0,
    unidad_medida: "",
    precio_compra: "",
    precio_venta: "",
    tipo: "insumo",
    status: true,
    id_categoria: "",
  });

  const [editando, setEditando] = useState(false);
  const [idActual, setIdActual] = useState(null);

  // 🔥 Obtener productos
  const getProductos = async () => {
    try {
      const res = await api.get("/productos");
      setProductos(res.data.data);
    } catch (error) {
      toast.error("Error al cargar productos");
    }
  };

  // 🔥 Obtener categorías
  const getCategorias = async () => {
    try {
      const res = await api.get("/categorias");
      setCategorias(res.data.data);
    } catch (error) {
      toast.error("Error al cargar categorías");
    }
  };

  useEffect(() => {
    getProductos();
    getCategorias();
  }, []);

  // 🧩 Manejar inputs
  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "status") {
      value = value === "1";
    }

    if (e.target.name === "id_categoria") {
      value = parseInt(value);
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
      stock_actual: 0,
      unidad_medida: "",
      precio_compra: "",
      precio_venta: "",
      tipo: "insumo",
      status: true,
      id_categoria: categorias.length > 0 ? categorias[0].id_categoria : "",
    });

    setEditando(false);
    document.getElementById("modal_producto").showModal();
  };

  // 🧩 Editar
  const openEdit = (p) => {
    setForm({
      nombre: p.nombre,
      descripcion: p.descripcion || "",
      stock_actual: p.stock_actual,
      unidad_medida: p.unidad_medida,
      precio_compra: p.precio_compra || "",
      precio_venta: p.precio_venta || "",
      tipo: p.tipo,
      status: p.status,
      id_categoria: p.id_categoria,
    });

    setIdActual(p.id_producto);
    setEditando(true);
    document.getElementById("modal_producto").showModal();
  };

  // 🧩 Guardar
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        await api.put(`/productos/${idActual}`, form);
        toast.success("Producto actualizado");
      } else {
        await api.post("/productos", form);
        toast.success("Producto creado");
      }

      document.getElementById("modal_producto").close();
      getProductos();

    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Error");
    }
  };

  // 🧩 Eliminar
  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar producto?")) return;

    try {
      await api.delete(`/productos/${id}`);
      toast.success("Producto eliminado");
      getProductos();
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  // 🧩 Toggle estado
  const toggleEstado = async (id) => {
    try {
      await api.post(`/productos/${id}/toggle-estado`);
      toast.success("Estado actualizado");
      getProductos();
    } catch (error) {
      toast.error("Error al cambiar estado");
    }
  };

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <Toaster />

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Productos 🛒</h1>

          <button className="btn btn-primary" onClick={openCreate}>
            + Nuevo Producto
          </button>
        </div>

        {/* TABLA */}
        <div className="overflow-x-auto bg-base-100 p-4 rounded-xl shadow">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Tipo</th>
                <th>Precio Venta</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((p) => (
                <tr key={p.id_producto}>
                  <td>{p.id_producto}</td>
                  <td>{p.nombre}</td>
                  <td>{p.categoria?.nombre || "Sin categoría"}</td>
                  <td>{p.stock_actual}</td>
                  <td>{p.tipo}</td>
                  <td>{p.precio_venta || "-"}</td>

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
                      onClick={() => toggleEstado(p.id_producto)}
                    >
                      Estado
                    </button>

                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(p.id_producto)}
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
        <dialog id="modal_producto" className="modal">
          <div className="modal-box">

            <h3 className="font-bold text-lg mb-4">
              {editando ? "Editar Producto" : "Nuevo Producto"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">

              <input name="nombre" placeholder="Nombre" className="input input-bordered w-full" onChange={handleChange} value={form.nombre} />

              <input name="descripcion" placeholder="Descripción" className="input input-bordered w-full" onChange={handleChange} value={form.descripcion} />

              <input name="stock_actual" type="number" placeholder="Stock" className="input input-bordered w-full" onChange={handleChange} value={form.stock_actual} />

              <input name="unidad_medida" placeholder="Unidad de medida" className="input input-bordered w-full" onChange={handleChange} value={form.unidad_medida} />

              <input name="precio_compra" type="number" placeholder="Precio compra" className="input input-bordered w-full" onChange={handleChange} value={form.precio_compra} />

              <input name="precio_venta" type="number" placeholder="Precio venta" className="input input-bordered w-full" onChange={handleChange} value={form.precio_venta} />

              <select name="tipo" className="select select-bordered w-full" onChange={handleChange} value={form.tipo}>
                <option value="insumo">Insumo</option>
                <option value="venta">Venta</option>
              </select>

              {/* 🔥 SELECT CATEGORÍAS */}
              <select
                name="id_categoria"
                className="select select-bordered w-full"
                onChange={handleChange}
                value={form.id_categoria}
              >
                {categorias.map((c) => (
                  <option key={c.id_categoria} value={c.id_categoria}>
                    {c.nombre}
                  </option>
                ))}
              </select>

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
                  onClick={() => document.getElementById("modal_producto").close()}
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

export default Productos;