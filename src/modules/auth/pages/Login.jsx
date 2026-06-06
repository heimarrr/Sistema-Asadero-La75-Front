import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { loginRequest } from '@/modules/auth/services/authService'
import toast from 'react-hot-toast'
import LoginForm from '@/modules/auth/components/LoginForm'
import '@/modules/auth/styles/login.css'

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)

    try {
      const res = await loginRequest(data)

      localStorage.setItem('token', res.access_token)

      localStorage.setItem('user', JSON.stringify(res.user))

      toast.success('Bienvenido 🔥')

      navigate('/home')
    } catch {
      toast.error('Credenciales incorrectas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">🍗</div>

          <div className="login-title">Asadero La 75</div>

          <div className="login-sub">Inicia sesión para continuar</div>
        </div>

        <LoginForm
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          loading={loading}
          showPass={showPass}
          setShowPass={setShowPass}
        />

        <div className="login-footer">Sistema interno • Asadero La 75</div>
      </div>
    </div>
  )
}

export default Login
