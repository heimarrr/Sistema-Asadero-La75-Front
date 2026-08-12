import { Eye, EyeOff, Lock, User, LogIn, Loader2 } from 'lucide-react'

function LoginForm({
  register,
  errors,
  handleSubmit,
  onSubmit,
  loading,
  showPass,
  setShowPass,
}) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="login-field">
        <label htmlFor="login" className="login-label">
          Usuario
        </label>

        <div className="login-input-wrap">
          <User size={16} className="login-icon-left" />

          <input
            id="login"
            className="login-input"
            placeholder="Tu usuario"
            {...register('login', {
              required: 'Requerido',
            })}
          />
        </div>

        {errors.login && (
          <span className="login-error">{errors.login.message}</span>
        )}
      </div>

      <div className="login-field">
        <label htmlFor="password" className="login-label">
          Contraseña
        </label>

        <div className="login-input-wrap">
          <Lock size={16} className="login-icon-left" />

          <input
            id="password"
            type={showPass ? 'text' : 'password'}
            className="login-input"
            placeholder="••••••••"
            {...register('password', {
              required: 'Requerido',
            })}
          />

          <button
            type="button"
            className="login-icon-right"
            onClick={() => {
              setShowPass((prev) => !prev)
            }}
            aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            aria-pressed={showPass}
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {errors.password && (
          <span className="login-error">{errors.password.message}</span>
        )}
      </div>

      <button type="submit" className="login-btn" disabled={loading}>
        {loading ? (
          <Loader2 className="animate-spin" size={16} />
        ) : (
          <LogIn size={16} />
        )}

        {loading ? 'Entrando...' : 'Iniciar sesión'}
      </button>
    </form>
  )
}

export default LoginForm
