import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Usuarios from './pages/Usuarios'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import MainLayout from "./components/layouts/MainLayout";
import Roles from './pages/Roles'
import Proveedores from './pages/Proveedores'
import Categorias from './pages/Categorias'
import Productos from './pages/Productos'
import Ventas from './pages/Ventas'
import NuevaVenta from './pages/NuevaVenta'  // 👈 agregar

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
            <Route path="/ventas/nueva" element={<NuevaVenta />} />  {/* 👈 agregar */}
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App