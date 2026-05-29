import { Trash2 } from 'lucide-react'

function CompraProductosTable({
  productos,
  eliminarProducto,
}) {

  return (

    <div
      className="cp-card"
      style={{
        marginTop: '20px',
      }}
    >

      <table className="cp-table">

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

          {productos.map((item) => (

            <tr
              key={item.id_producto}
            >

              <td>
                {item.nombre}
              </td>

              <td>
                {item.cantidad}
              </td>

              <td>
                $
                {Number(
                  item.precio_unitario
                ).toLocaleString()}
              </td>

              <td>
                $
                {Number(
                  item.subtotal
                ).toLocaleString()}
              </td>

              <td>

                <button
                  type="button"
                  className="cp-delete"
                  onClick={() =>
                    eliminarProducto(
                      item.id_producto
                    )
                  }
                >

                  <Trash2 size={15} />

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}

export default CompraProductosTable