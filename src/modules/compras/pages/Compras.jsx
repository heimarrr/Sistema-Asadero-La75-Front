import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Eye, Trash2, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import '@/styles/global.css'
import '@/styles/components/table.css'
import '@/styles/components/modal.css'
import Table from '@/components/ui/Table'
import CompraDetalleModal from '../components/CompraDetalleModal'
import CompraDeleteModal from '../components/CompraDeleteModal'
import { getCompras, getCompra, deleteCompra } from '../services/comprasService'

function Compras() {
  const [compras, setCompras] = useState([])
  const [compraDetalle, setCompraDetalle] = useState(null)
  const [compraEliminar, setCompraEliminar] = useState(null)

  const [modalDetalle, setModalDetalle] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)

  const loadCompras = async () => {
    try {
      const data = await getCompras()

      console.log(data)

      setCompras(data || [])
    } catch (error) {
      console.error(error)

      toast.error('Error al cargar compras')
    }
  }

  useEffect(() => {
    loadCompras()
  }, [])

  const verDetalle = async (id) => {
    try {
      const data = await getCompra(id)

      console.log(data)

      setCompraDetalle(data)

      setModalDetalle(true)
    } catch (error) {
      console.error(error)

      toast.error('Error al obtener detalle')
    }
  }

  const openEliminar = (compra) => {
    setCompraEliminar(compra)
    setModalEliminar(true)
  }

  const confirmarEliminar = async () => {
    try {
      const data = await deleteCompra(compraEliminar.id_compra)

      toast.success('Compra anulada')

      setModalEliminar(false)

      loadCompras()
    } catch (error) {
      console.error(error)

      toast.error(data?.message || 'Error al anular compra')
    }
  }

  const columns = [
    {
      header: 'Compra',

      render: (c) => (
        <div className="pg-role">
          <div className="pg-icon">
            <ShoppingCart size={16} />
          </div>
          #{c.id_compra}
        </div>
      ),
    },

    {
      header: 'Fecha',

      render: (c) => new Date(c.fecha).toLocaleDateString(),
    },

    {
      header: 'Proveedor',

      render: (c) => c.proveedor?.nombre || '-',
    },

    {
      header: 'Usuario',

      render: (c) => c.usuario?.nombre || '-',
    },

    {
      header: 'Total',

      render: (c) => `$ ${Number(c.total).toLocaleString()}`,
    },

    {
      header: 'Estado',

      render: (c) => (
        <span className={`pg-badge ${c.status == 1 ? 'active' : 'inactive'}`}>
          {c.status == 1 ? 'Activa' : 'Anulada'}
        </span>
      ),
    },

    {
      header: 'Acciones',

      render: (c) => (
        <div className="pg-actions">
          <button className="pg-btn" onClick={() => verDetalle(c.id_compra)}>
            <Eye size={14} />
          </button>

          {c.status == 1 && (
            <button className="pg-btn del" onClick={() => openEliminar(c)}>
              <Trash2 size={14} />
            </button>
          )}
        </div>
      ),
    },
  ]

  return (
    <>
      <div className="pg">
        <div className="pg-header">
          <div>
            <h1 className="pg-title">Compras</h1>

            <p className="pg-sub">{compras.length} registradas</p>
          </div>

          <Link to="/compras/nueva" className="pg-btn-new">
            <ShoppingCart size={16} />
            Nueva Compra
          </Link>
        </div>

        <Table columns={columns} data={compras} rowKey="id_compra" />

        <CompraDetalleModal
          open={modalDetalle}
          onClose={() => setModalDetalle(false)}
          compraDetalle={compraDetalle}
        />

        <CompraDeleteModal
          open={modalEliminar}
          onClose={() => setModalEliminar(false)}
          compraEliminar={compraEliminar}
          confirmarEliminar={confirmarEliminar}
        />
      </div>
    </>
  )
}

export default Compras
