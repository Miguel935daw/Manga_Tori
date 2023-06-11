import { useAuth } from "../Context/UserContext";
import { useTheme } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
function Subscription() {
  const { userSession, userSubscription } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "5%",
        }}
      >
        <div
          className={
            theme === "light"
              ? "subscriptionSpot1 Applight"
              : "subscriptionSpot1 Appdark"
          }
        >
          <img src="/images/logo.png" alt="logo" className="loginLogo" />
          <h2
            className={theme === "light" ? "title Applight" : "title Appdark"}
          >
            Registrado
          </h2>
          <ul
            className={theme === "light" ? "title Applight" : "title Appdark"}
            style={{
              display: "block",
              height: "100%",
              width: "60%",
              textAlign: "left",
              marginLeft: "15%",
            }}
          >
            <li style={{}}>
              Límite de lectura: 5 Primeros capítulos de cada Manga
            </li>
            <li>Descargar capítulos: No</li>
            <li>Crear Listas: No</li>
            <li>Coste: 0€/mes</li>
          </ul>
        </div>
        <div
          className={
            theme === "light"
              ? "subscriptionSpot2 Applight"
              : "subscriptionSpot2 Appdark"
          }
        >
          <img src="/images/logo.png" alt="logo" className="loginLogo" />
          <h2
            className={theme === "light" ? "title Applight" : "title Appdark"}
          >
            Suscrito
          </h2>
          <ul
            className={theme === "light" ? "title Applight" : "title Appdark"}
            style={{
              display: "block",
              height: "100%",
              width: "60%",
              textAlign: "left",
              marginLeft: "15%",
              marginBottom: "5%",
            }}
          >
            <li>Límite de lectura: Sin Límite</li>
            <li>Descargar capítulos: Sí</li>
            <li>Crear Listas: Sí</li>
            <li>Coste: 5€/mes</li>
          </ul>
          <form
            action="http://localhost:4242/create-checkout-session"
            method="POST"
          >
            <input type="hidden" name="lookup_key" value="a" />
            <button id="checkout-and-portal-button" className="suscribe2" type="submit">
              Suscribirse
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Subscription;
