import supabase from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/UserContext";

import { useTheme } from "../Context/ThemeContext";

import "../styles/styles.css";
function NavBar() {
  const { userSession, userSubscription } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const subcription = userSubscription == true ? "Suscriptor" : "No Suscriptor";
  if (userSession !== null) {
    return (
      <nav className={theme === "light" ? "App light" : "App dark"}>
        <img
          src="/images/logo.png"
          alt="logo"
          className="logo"
          onClick={() => navigate("/")}
        />
        <ul>
          <li>
            <a>{subcription}</a>
          </li>
          <li>
            <a onClick={() => navigate("/Biblioteca")}>Biblioteca</a>
          </li>
          <li>
            <a onClick={() => supabase.auth.signOut()}>Cerrar Sesión</a>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className={theme === "light" ? "Applight" : "Appdark"}>
      <img
        src="/images/logo.png"
        alt="logo"
        className="logo"
        onClick={() => navigate("/")}
      />
      <ul>
        <li htmlFor="toggle" className="toggle-button">
          {theme === "light" ? (
            <>
              <img src="/images/DarkTheme.png" alt="Tema" id="icon" />
              <input type="checkbox" id="toggle" />
            </>
          ) : (
            <>
              <img src="/images/LightTheme.png" alt="Tema" id="icon" />
              <input type="checkbox" id="toggle" checked="true" />
            </>
          )}

          <span
            className="slider"
            onClick={() => {
              document.getElementById("toggle").click(), toggleTheme();
            }}
          ></span>
        </li>
        <li>
          <a onClick={() => navigate("/Biblioteca")}>Biblioteca</a>
        </li>
        <li>
          <a onClick={() => navigate("/Login")}>Iniciar Sesión</a>
        </li>
        <li>
          <a onClick={() => navigate("/Register")}>Registrarse</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
