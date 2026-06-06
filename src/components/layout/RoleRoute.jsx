import { Navigate, Outlet } from 'react-router-dom'

const RoleRoute = ({ roles }) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (!user) {
    return <Navigate to="/" replace />
  }

  // OJO: en tu backend es "rol", no "rol_id"
  return roles.includes(user.rol)
    ? <Outlet />
    : <Navigate to="/home" replace />
}

export default RoleRoute