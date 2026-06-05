import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import { Toaster } from 'react-hot-toast'
import Compras from './modules/compras/pages/Compras'
import NuevaCompra from './modules/compras/pages/NuevaCompra'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/ventas/nueva" element={<NuevaVenta />} />
            <Route path="/compras" element={<Compras />} />
            <Route path="/compras/nueva" element={<NuevaCompra />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
