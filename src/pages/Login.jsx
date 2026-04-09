import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api";
import toast from "react-hot-toast";
import { Eye, EyeOff, Lock, User, LogIn, Loader2 } from "lucide-react";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/login", data);
      localStorage.setItem("token", res.data.access_token);
      toast.success("Bienvenido 🔥");
      navigate("/home");
    } catch {
      toast.error("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .pg-login {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f1117, #1a1d29);
          font-family: 'Inter';
          color: #e5e7eb;
        }

        .pg-card {
          width: 100%;
          max-width: 380px;
          background: #232633;
          border: 1px solid #2f3441;
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .pg-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .pg-logo {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: #6366f1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin: 0 auto 10px;
        }

        .pg-title {
          font-size: 1.4rem;
          font-weight: 600;
        }

        .pg-sub {
          font-size: 12px;
          color: #6b7280;
        }

        .pg-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }

        .pg-label {
          font-size: 11px;
          color: #6b7280;
        }

        .pg-input-wrap {
          position: relative;
        }

        .pg-input {
          width: 100%;
          padding: 10px 36px;
          border-radius: 10px;
          border: 1px solid #2f3441;
          background: #181a20;
          color: white;
          transition: all 0.2s;
        }

        .pg-input:focus {
          outline: none;
          border-color: #6366f1;
          background: #1e2028;
        }

        .pg-icon-left {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
        }

        .pg-icon-right {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #6b7280;
        }

        .pg-error {
          font-size: 11px;
          color: #f87171;
        }

        .pg-btn {
          margin-top: 10px;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #6366f1;
          color: white;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s;
        }

        .pg-btn:hover {
          background: #4f46e5;
        }

        .pg-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .pg-footer {
          margin-top: 18px;
          text-align: center;
          font-size: 11px;
          color: #6b7280;
        }

      `}</style>

      <div className="pg-login">
        <div className="pg-card">

          <div className="pg-header">
            <div className="pg-logo">🍗</div>
            <div className="pg-title">Asadero La 75</div>
            <div className="pg-sub">Inicia sesión para continuar</div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Usuario */}
            <div className="pg-field">
              <label className="pg-label">Usuario</label>
              <div className="pg-input-wrap">
                <User size={16} className="pg-icon-left"/>
                <input
                  className="pg-input"
                  placeholder="Tu usuario"
                  {...register("login", { required: "Requerido" })}
                />
              </div>
              {errors.login && <span className="pg-error">{errors.login.message}</span>}
            </div>

            {/* Password */}
            <div className="pg-field">
              <label className="pg-label">Contraseña</label>
              <div className="pg-input-wrap">
                <Lock size={16} className="pg-icon-left"/>
                <input
                  type={showPass ? "text" : "password"}
                  className="pg-input"
                  placeholder="••••••••"
                  {...register("password", { required: "Requerido" })}
                />
                <span
                  className="pg-icon-right"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                </span>
              </div>
              {errors.password && <span className="pg-error">{errors.password.message}</span>}
            </div>

            <button className="pg-btn" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" size={16}/> : <LogIn size={16}/>}
              {loading ? "Entrando..." : "Iniciar sesión"}
            </button>

          </form>

          <div className="pg-footer">
            Sistema interno • Asadero La 75
          </div>

        </div>
      </div>
    </>
  );
}

export default Login;