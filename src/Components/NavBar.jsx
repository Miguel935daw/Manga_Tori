import { useEffect } from "react";
import supabase from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/UserContext";

import { useTheme } from "../Context/ThemeContext";

import "../styles/styles.css";
function NavBar() {
  const { userSession, userSubscription } = useAuth();
  const { theme, toggleTheme, setTheme } = useTheme();
  const navigate = useNavigate();

  //Use Effect para guardar el manga seleccionado en el localStorage
  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", JSON.stringify(theme));
    }
  }, [theme]);

  //UseEffect para almacenar el manga actual en localStorage
  useEffect(() => {
    const storedState = localStorage.getItem("theme");
    if (storedState) {
      setTheme(JSON.parse(storedState));
    } else {
      setTheme("light");
    }
  }, [setTheme]);

  if (userSession !== null) {
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
              </>
            ) : (
              <>
                <img src="/images/LightTheme.png" alt="Tema" id="icon" />
              </>
            )}

            <span
              className={
                theme === "light" ? "slider Applight" : "slider Appdark"
              }
              onClick={() => {
                toggleTheme();
              }}
            ></span>
          </li>
          {userSubscription ? (
            <li>
              <a onClick={() => navigate("/Listas")}>Mis Listas</a>
            </li>
          ) : (
            ""
          )}
          <li>
            {userSubscription ? (
              <a href="https://billing.stripe.com/p/login/test_aEU295gujfxOc928ww">
                Suscripcion
              </a>
            ) : (
              <a onClick={() => navigate("/Subscription")}>Suscripcion</a>
            )}
          </li>
          <li>
            <a onClick={() => navigate("/Library")}>Biblioteca</a>
          </li>
          <li>
            <a
              onClick={() => {
                supabase.auth.signOut();
                navigate("/");
              }}
            >
              Cerrar Sesión
            </a>
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
            </>
          ) : (
            <>
              <img src="/images/LightTheme.png" alt="Tema" id="icon" />
            </>
          )}

          <span
            className={theme === "light" ? "slider Applight" : "slider Appdark"}
            onClick={() => {
              toggleTheme();
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
