import { Trash2 } from 'lucide-react'

function CarritoTable({
  carrito,
  total,
  onCambiarCantidad,
  onQuitar,
  onConfirmar,
}) {
  return (
    <div className="vt-card">
      <h3 className="vt-card-title">
        Productos agregados
      </h3>

      <table className="vt-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {carrito.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="vt-table-empty"
              >
                No hay productos agregados
              </td>
            </tr>
          ) : (
            carrito.map((item) => (
              <tr key={item.id_producto}>
                <td>{item.nombre}</td>

                <td>
                  <input
                    type="number"
                    min="1"
                    className="vt-input"
                    value={item.cantidad}
                    onChange={(e) =>
                      onCambiarCantidad(
                        item.id_producto,
                        e.target.value,
                      )
                    }
                  />
                </td>

                <td>
                  $
                  {Number(
                    item.precio_unitario,
                  ).toLocaleString()}
                </td>

                <td>
                  $
                  {Number(
                    item.subtotal,
                  ).toLocaleString()}
                </td>

                <td>
                  <button
                    type="button"
                    className="vt-delete"
                    onClick={() =>
                      onQuitar(item.id_producto)
                    }
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {carrito.length > 0 && (
        <>
          <div className="vt-total">
            <p className="vt-total-label">
              Total venta
            </p>

            <h2 className="vt-total-amount">
              ${total.toLocaleString()}
            </h2>
          </div>

          <button
            type="button"
            className="vt-btn-save"
            onClick={onConfirmar}
          >
            Confirmar venta
          </button>
        </>
      )}
    </div>
  )
}

export default CarritoTable