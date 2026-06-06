import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import RoleRoute from './components/layout/RoleRoute'
import Login from './modules/auth/pages/Login'
import Usuarios from './modules/usuarios/pages/Usuarios'
import PrivateRoute from './components/layout/PrivateRoute'
import Home from './pages/Home'
import MainLayout from './components/layout/MainLayout'
import Roles from './modules/roles/pages/Roles'
import Proveedores from './modules/proveedores/pages/Proveedores'
import Categorias from './modules/categorias/pages/Categorias'
import Productos from './modules/productos/pages/Productos'
import Ventas from './modules/ventas/pages/Ventas'
import NuevaVenta from './modules/ventas/pages/NuevaVenta'
import Compras from './modules/compras/pages/Compras'
import NuevaCompra from './modules/compras/pages/NuevaCompra'

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#232633',
            color: '#e5e7eb',
            fontSize: '13.5px',
            border: '1px solid #2f3441',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#232633',
            },
          },
          error: {
            iconTheme: {
              primary: '#f87171',
              secondary: '#232633',
            },
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />

            {/* ADMIN */}
            <Route element={<RoleRoute roles={[1]} />}>
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/roles" element={<Roles />} />
            </Route>

            {/* ADMIN + COMPRAS */}
            <Route element={<RoleRoute roles={[1, 2]} />}>
              <Route path="/proveedores" element={<Proveedores />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/compras" element={<Compras />} />
             
              <Route path="/compras/nueva" element={<NuevaCompra />} />
            </Route>

            {/* ADMIN + CAJERO */}
            <Route element={<RoleRoute roles={[1, 3]} />}>
              <Route path="/ventas" element={<Ventas />} />
              <Route path="/ventas/nueva" element={<NuevaVenta />} />
            </Route>

            <Route element={<RoleRoute roles={[1, 2, 3]} />}>
               <Route path="/productos" element={<Productos />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
