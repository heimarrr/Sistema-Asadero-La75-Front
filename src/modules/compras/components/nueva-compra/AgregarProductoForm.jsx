import { Plus } from 'lucide-react'

function AgregarProductoForm({
  detalle,
  setDetalle,
  productos,
  agregarProducto,
}) {

  return (

    <div
      className="cp-card"
      style={{
        marginTop: '20px',
      }}
    >

      <h3 className="cp-card-title">
        Agregar Productos
      </h3>

      <div className="cp-row">

        <div>

          <label className="cp-label">
            Producto
          </label>

          <select
            className="cp-select"
            value={detalle.id_producto}
            onChange={(e) =>
              setDetalle({
                ...detalle,
                id_producto:
                  e.target.value,
              })
            }
          >

            <option value="">
              Seleccionar
            </option>

            {productos.map((p) => (

              <option
                key={p.id_producto}
                value={p.id_producto}
              >
                {p.nombre}
              </option>

            ))}

          </select>

        </div>

        <div>

          <label className="cp-label">
            Cantidad
          </label>

          <input
            type="number"
            className="cp-input"
            value={detalle.cantidad}
            onChange={(e) =>
              setDetalle({
                ...detalle,
                cantidad:
                  e.target.value,
              })
            }
          />

        </div>

        <div>

          <label className="cp-label">
            Precio
          </label>

          <input
            type="number"
            className="cp-input"
            value={
              detalle.precio_unitario
            }
            onChange={(e) =>
              setDetalle({
                ...detalle,
                precio_unitario:
                  e.target.value,
              })
            }
          />

        </div>

        <button
          type="button"
          className="cp-btn-add"
          onClick={
            agregarProducto
          }
        >

          <Plus size={18} />

        </button>

      </div>

    </div>
  )
}

export default AgregarProductoForm