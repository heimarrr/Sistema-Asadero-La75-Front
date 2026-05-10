import { useEffect, useState } from 'react'
import api from '../api/api'
import toast from 'react-hot-toast'
import { Users, ShoppingCart, Package, TrendingUp } from 'lucide-react'
// Importamos componentes de Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

function Home() {
  const [usuarios, setUsuarios] = useState(0)
  const [ventas, setVentas] = useState(0)
  const [productos, setProductos] = useState(0)

  // Preparamos los datos para la gráfica
  const dataGrafica = [
    { name: 'Usuarios', total: usuarios, color: '#60a5fa' },
    { name: 'Ventas', total: ventas, color: '#22c55e' },
    { name: 'Productos', total: productos, color: '#f59e0b' },
  ]

  useEffect(() => {
    const getData = async () => {
      try {
        const resUsuarios = await api.get('/usuarios')
        setUsuarios(resUsuarios.data.data.length)

        try {
          const resVentas = await api.get('/ventas')
          setVentas(resVentas.data.data.length)
        } catch {
          setVentas(0)
        }

        try {
          const resProductos = await api.get('/productos')
          setProductos(resProductos.data.data.length)
        } catch {
          setProductos(0)
        }
      } catch {
        toast.error('Error al cargar datos')
      }
    }
    getData()
  }, [])

  return (
    <>
      <style>{`
        .pg { font-family: 'Inter'; color: #e5e7eb; }
        .pg-header { margin-bottom: 2rem; }
        .pg-title { font-size: 1.6rem; font-weight: 600; color: #fff; margin: 0; }
        .pg-sub { font-size: 13px; color: #6b7280; }
        .pg-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .pg-card { background: #232633; border: 1px solid #2f3441; border-radius: 14px; padding: 20px; transition: all 0.2s ease; }
        .pg-card:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
        .pg-icon { padding: 8px; border-radius: 10px; background: #181a20; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 12px; }
        .pg-label { font-size: 13px; color: #9ca3af; font-weight: 500; }
        .pg-value { font-size: 2.2rem; font-weight: 800; color: #fff; margin-top: 4px; }
        
        /* Estilos de la gráfica */
        .pg-chart-container { background: #232633; border: 1px solid #2f3441; border-radius: 14px; padding: 24px; }
        .chart-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .chart-title { font-size: 1.1rem; font-weight: 600; color: #fff; }

        .users { color: #60a5fa; }
        .ventas { color: #22c55e; }
        .productos { color: #f59e0b; }
      `}</style>

      <div className="pg">
        <div className="pg-header">
          <h1 className="pg-title">Dashboard</h1>
          <p className="pg-sub">Resumen general del sistema de Asadero La 75</p>
        </div>

        {/* CARDS */}
        <div className="pg-grid">
          <div className="pg-card">
            <div className="pg-icon users">
              <Users size={20} />
            </div>
            <div className="pg-label">Total Usuarios</div>
            <div className="pg-value">{usuarios}</div>
          </div>

          <div className="pg-card">
            <div className="pg-icon ventas">
              <ShoppingCart size={20} />
            </div>
            <div className="pg-label">Ventas Realizadas</div>
            <div className="pg-value">{ventas}</div>
          </div>

          <div className="pg-card">
            <div className="pg-icon productos">
              <Package size={20} />
            </div>
            <div className="pg-label">Stock de Productos</div>
            <div className="pg-value">{productos}</div>
          </div>
        </div>

        {/* GRÁFICA */}
        <div className="pg-chart-container">
          <div className="chart-header">
            <TrendingUp size={20} className="users" />
            <span className="chart-title">Estadísticas Comparativas</span>
          </div>

          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                data={dataGrafica}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#2f3441"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: '#1e2028' }}
                  contentStyle={{
                    background: '#181a20',
                    border: '1px solid #2f3441',
                    borderRadius: '8px',
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="total" radius={[6, 6, 0, 0]} barSize={50}>
                  {dataGrafica.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
