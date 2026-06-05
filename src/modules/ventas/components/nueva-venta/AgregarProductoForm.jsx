import { Plus } from 'lucide-react'

function AgregarProductoForm({
  busqueda,
  setBusqueda,
  detalle,
  setDetalle,
  productosFiltrados,
  productoActual,
  agregarProducto,
}) {
  return (
    <div className="vt-card">
      <h3 className="vt-card-title">
        Agregar producto
      </h3>

      <div className="vt-form-group">
        <label className="vt-label">
          Buscar producto
        </label>

        <input
          className="vt-input"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {busqueda.trim() && (
          <div className="vt-search-results">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <button
                  key={producto.id_producto}
                  type="button"
                  className="vt-search-item"
                  onClick={() => {
                    setDetalle({
                      ...detalle,
                      id_producto: producto.id_producto,
                    })

                    setBusqueda(producto.nombre)
                  }}
                >
                  <span>{producto.nombre}</span>

                  <span>
                    $
                    {Number(
                      producto.precio_venta,
                    ).toLocaleString()}
                  </span>
                </button>
              ))
            ) : (
              <div className="vt-search-empty">
                No se encontraron productos
              </div>
            )}
          </div>
        )}
      </div>

      {productoActual && (
        <div
          style={{
            marginBottom: '1rem',
            fontSize: '13px',
            color: '#9ca3af',
          }}
        >
          Stock disponible: {productoActual.stock_actual}
        </div>
      )}

      <div className="vt-row">
        <div className="vt-form-group">
          <label className="vt-label">
            Cantidad
          </label>

          <input
            type="number"
            min="1"
            className="vt-input"
            value={detalle.cantidad}
            onChange={(e) =>
              setDetalle({
                ...detalle,
                cantidad: e.target.value,
              })
            }
          />
        </div>

        <button
          type="button"
          className="vt-btn-add"
          onClick={agregarProducto}
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  )
}

export default AgregarProductoForm