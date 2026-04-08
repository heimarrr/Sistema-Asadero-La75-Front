import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, Lock, User, LogIn, Loader2 } from "lucide-react";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/login", {
        login: data.login,
        password: data.password
      });

      localStorage.setItem("token", res.data.access_token);
      toast.success("¡Bienvenido de nuevo!");

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      toast.error("Credenciales incorrectas. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-primary/20 via-base-100 to-secondary/20 p-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300 overflow-hidden">
        {/* Decoración superior estética */}
        <div className="h-2 bg-gradient-to-r from-primary to-secondary w-full"></div>
        
        <div className="card-body p-8 md:p-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
              <span className="text-4xl">🍗</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-center">
              Asadero La 75
            </h2>
            <p className="text-base-content/60 text-sm mt-2 font-medium">
              Gestión Administrativa
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Campo Usuario */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-xs uppercase tracking-widest opacity-70">Usuario</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-base-content/40">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  placeholder="Ingresa tu usuario"
                  className={`input input-bordered w-full pl-10 bg-base-200/30 focus:bg-base-100 transition-all ${errors.login ? "input-error" : "focus:input-primary"}`}
                  {...register("login", { required: "El usuario es obligatorio" })}
                />
              </div>
              {errors.login && (
                <label className="label p-0 mt-1">
                  <span className="text-error text-xs font-medium">{errors.login.message}</span>
                </label>
              )}
            </div>

            {/* Campo Contraseña */}
            <div className="form-control">
              <label className="label py-1 flex justify-between">
                <span className="label-text font-bold text-xs uppercase tracking-widest opacity-70">Contraseña</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-base-content/40">
                  <Lock size={18} />
                </span>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className={`input input-bordered w-full px-10 bg-base-200/30 focus:bg-base-100 transition-all ${errors.password ? "input-error" : "focus:input-primary"}`}
                  {...register("password", { required: "La contraseña es obligatoria" })}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/40 hover:text-primary transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <label className="label p-0 mt-1">
                  <span className="text-error text-xs font-medium">{errors.password.message}</span>
                </label>
              )}
            </div>

            {/* Botón de Ingreso */}
            <div className="form-control mt-6">
              <button
                className={`btn btn-primary w-full shadow-lg shadow-primary/20 gap-2 h-12 text-base normal-case ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {!loading && <LogIn size={20} />}
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Verificando...
                  </>
                ) : "Iniciar Sesión"}
              </button>
            </div>
          </form>

          {/* Footer del login */}
          <div className="mt-8 text-center border-t border-base-200 pt-6">
            <p className="text-xs text-base-content/50">
              Desarrollado para la gestión interna de <strong>Asadero La 75</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;