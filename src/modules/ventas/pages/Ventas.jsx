import { useEffect, useState } from 'react'
import api from '../../../api/api'
import toast from 'react-hot-toast'
import { ShoppingBag, Eye, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import '@/styles/global.css'
import '@/styles/components/table.css'
import '@/styles/components/modal.css'
import Table from '@/components/ui/Table'
import VentaDetalleModal from '../components/VentaDetalleModal'
import VentaDeleteModal from '../components/VentaDeleteModal'
import { getVentas, getVenta, deleteVenta } from '../services/ventasService'

function Ventas() {
  const [ventas, setVentas] = useState([])
  const [ventaDetalle, setVentaDetalle] = useState(null)
  const [ventaEliminar, setVentaEliminar] = useState(null)
  const [modalDetalle, setModalDetalle] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)

  const loadVentas = async () => {
    try {
      const data = await getVentas()
      setVentas(data || [])
    } catch {
      toast.error('Error al cargar ventas')
    }
  }

  useEffect(() => {
    loadVentas()
  }, [])

  const verDetalle = async (id) => {
    try {
      const data = await getVenta(id)

      setVentaDetalle(data)

      setModalDetalle(true)
    } catch {
      toast.error('Error al obtener detalle')
    }
  }

  const openEliminar = (venta) => {
    setVentaEliminar(venta)
    setModalEliminar(true)
  }

  const confirmarEliminar = async () => {
    try {
      const data = await deleteVenta(ventaEliminar.id_venta)

      toast.success('Venta anulada')

      setModalEliminar(false)
      loadVentas()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al anular venta')
    }
  }

  const columns = [
  {
    header: 'Venta',
    render: (v) => (
      <div className="pg-role">
        <div className="pg-icon">
          <ShoppingBag size={16} />
        </div>
        #{v.id_venta}
      </div>
    ),
  },
  {
    header: 'Fecha',
    render: (v) => new Date(v.fecha).toLocaleDateString(),
  },
  {
    header: 'Usuario',
    render: (v) => v.usuario?.nombre || '-',
  },
  {
    header: 'Total',
    render: (v) => `$ ${Number(v.total).toLocaleString()}`,
  },
  {
    header: 'Estado',
    render: (v) => (
      <span className={`pg-badge ${v.status == 1 ? 'active' : 'inactive'}`}>
        {v.status == 1 ? 'Activa' : 'Anulada'}
      </span>
    ),
  },
  {
    header: 'Acciones',
    render: (v) => (
      <div className="pg-actions">
        <button className="pg-btn" onClick={() => verDetalle(v.id_venta)}>
          <Eye size={14} />
        </button>
        {v.status == 1 && (
          <button className="pg-btn del" onClick={() => openEliminar(v)}>
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
            <h1 className="pg-title">Ventas</h1>

            <p className="pg-sub">{ventas.length} registradas</p>
          </div>

          <Link to="/ventas/nueva" className="pg-btn-new">
            <ShoppingBag size={16} />
            Nueva Venta
          </Link>
        </div>

        <Table columns={columns} data={ventas} rowKey="id_venta" />

        <VentaDetalleModal
          open={modalDetalle}
          onClose={() => setModalDetalle(false)}
          ventaDetalle={ventaDetalle}
        />

        <VentaDeleteModal
          open={modalEliminar}
          onClose={() => setModalEliminar(false)}
          ventaEliminar={ventaEliminar}
          confirmarEliminar={confirmarEliminar}
        />
      </div>
    </>
  )
}


export default Ventas
