import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../api";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/login", {
        login: data.login,
        password: data.password
      });

      // 🔐 guardar token
      localStorage.setItem("token", res.data.access_token);

      toast.success("Bienvenido 😎");

      // redirigir
      setTimeout(() => {
        navigate("/home");
      }, 1000);

    } catch (error) {
      toast.error("Credenciales incorrectas 😢");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <Toaster />

      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">

          <h2 className="text-2xl font-bold text-center">
            Iniciar sesión 🔐
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Usuario */}
            <div className="form-control">
              <label className="label">Usuario o correo</label>
              <input
                type="text"
                className="input input-bordered"
                {...register("login", { required: "Campo obligatorio" })}
              />
              {errors.login && (
                <span className="text-red-500 text-sm">
                  {errors.login.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-control mt-3">
              <label className="label">Contraseña</label>
              <input
                type="password"
                className="input input-bordered"
                {...register("password", { required: "Campo obligatorio" })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Botón */}
            <div className="form-control mt-5">
              <button className="btn btn-primary">
                Ingresar
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;