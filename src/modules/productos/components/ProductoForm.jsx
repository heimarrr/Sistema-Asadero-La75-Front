function ProductoForm({
  form,
  categorias = [], // 1. Le asignamos un valor por defecto para asegurar que siempre sea un array
  handleChange,
  handleSubmit,
  onClose,
  editando,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="pg-modal-body">
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="pg-input"
          required
        />
        <input
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="pg-input"
        />
        <input
          name="stock_actual"
          placeholder="Stock Actual"
          value={form.stock_actual}
          onChange={handleChange}
          className="pg-input"
        />
        <input
          name="tipo"
          placeholder="Tipo"
          value={form.tipo}
          onChange={handleChange}
          className="pg-input"
        />
        <input
          name="unidad_medida"
          placeholder="Unidad de Medida"
          value={form.unidad_medida}
          onChange={handleChange}
          className="pg-input"
        />
        <input
          name="precio_compra"
          placeholder="Precio de Compra"
          value={form.precio_compra}
          onChange={handleChange}
          className="pg-input"
        />
        <input
          name="precio_venta"
          placeholder="Precio de Venta"
          value={form.precio_venta}
          onChange={handleChange}
          className="pg-input"
        />

        <select
          name="id_categoria"
          value={form.id_categoria}
          onChange={handleChange}
          className="pg-select"
          required
        >
          <option value="">Selecciona una categoría</option>
          {categorias?.map((categoria) => (
            <option key={categoria.id_categoria} value={categoria.id_categoria}>
              {categoria.nombre}
            </option>
          ))}
        </select>

        <select
          name="status"
          value={form.status ? '1' : '0'}
          onChange={handleChange}
          className="pg-select"
        >
          <option value="1">Activo</option>
          <option value="0">Inactivo</option>
        </select>
      </div>

      <div className="pg-modal-footer">
        <button type="button" className="pg-btn-cancel" onClick={onClose}>
          Cancelar
        </button>
        <button type="submit" className="pg-btn-save">
          {editando ? 'Actualizar producto' : 'Guardar producto'}
        </button>
      </div>
    </form>
  )
}

export default ProductoForm
