import { useEffect, useState } from "react";
import { supabase } from "../Supabase/client";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useTheme } from "../Context/ThemeContext";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useTheme();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Uso la api de supabase para iniciar sesión con las credenciales introducidas
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        document.getElementById("error").innerText =
          "Credenciales de inicio de sesión inválidas";
      }else{
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className={theme === "light" ? "login Applight" : "login Appdark"}>
        <form
          onSubmit={handleSubmit}
          className={theme === "light" ? "form Applight" : "form Appdark"}
        >
          <div className="header">
            <img src="/images/logo.png" alt="logo" className="loginLogo" />
            <h2>Iniciar Sesión</h2>
          </div>
          <div>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              className={theme === "light" ? "input Applight" : "input Appdark"}
              type="email"
              name="email"
              placeholder="tucorreo@algo.com"
              onChange={(e) => setEmail(e.target.value)}
              autocomplete="off"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              className={theme === "light" ? "input Applight" : "input Appdark"}
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className={theme === "light" ? "button Applight" : "button Appdark"}
          >
            Iniciar Sesión
          </button>
          <div className="error">
            <p id="error"></p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
