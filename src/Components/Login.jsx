import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Uso la api de supabase para iniciar sesión con las credenciales introducidas
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>
        <label htmlFor="email">Correo Electrónico</label>
        <input
          type="email"
          name="email"
          placeholder="youremail@site.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Iniciar Sesión</button>
      </form>
      <button
        onClick={() => {
          navigate("/Register");
        }}
      >
        Registrarse
      </button>
    </div>
  );
}

export default Login;
