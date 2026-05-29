import { X } from 'lucide-react'

function CompraDetalleModal({
  open,
  onClose,
  compraDetalle,
}) {

  if (!open) return null

  return (

    <div
      className="pg-overlay"
      onClick={(e) =>
        e.target === e.currentTarget &&
        onClose()
      }
    >

      <div
        className="pg-modal"
        style={{ maxWidth: '600px' }}
      >

        <div className="pg-modal-header">

          <h3>
            Detalle Compra #
            {compraDetalle?.id_compra}
          </h3>

          <button
            className="pg-btn"
            onClick={onClose}
          >
            <X size={16} />
          </button>

        </div>

        <div className="pg-modal-body">

          {compraDetalle?.detalles?.length > 0 ? (

            <table className="pg-table">

              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                </tr>
              </thead>

              <tbody>

                {compraDetalle.detalles.map(
                  (item, index) => (

                    <tr key={index}>

                      <td>
                        {item.producto?.nombre || '-'}
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

                    </tr>
                  )
                )}

              </tbody>

            </table>

          ) : (

            <div>
              Sin detalles
            </div>

          )}

          <div
            style={{
              marginTop: '20px',
              textAlign: 'right',
            }}
          >

            <strong>
              Total: $
              {Number(
                compraDetalle?.total || 0
              ).toLocaleString()}
            </strong>

          </div>

        </div>

        <div className="pg-modal-footer">

          <button
            className="pg-btn-cancel"
            onClick={onClose}
          >
            Cerrar
          </button>

        </div>

      </div>

    </div>
  )
}

export default CompraDetalleModal