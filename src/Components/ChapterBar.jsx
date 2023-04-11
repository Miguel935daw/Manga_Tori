import supabase from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { useChapter } from "../Context/ChapterContext";
import { useTheme } from "../Context/ThemeContext";

function ChapterBar() {
  const { theme, toggleTheme } = useTheme();
  const { viewMode, separation, width, setViewMode, setSeparation, setWidth } =
    useChapter();
  const navigate = useNavigate();
  let completa = false;
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
        <li onClick={() => navigate("/Manga")}>
          <img src="/images/getBackIcon.png" alt="" className="icon" />
          <a>Volver</a>
        </li>
        <li onClick={() => setViewMode(!viewMode)}>
          {viewMode === false ? (
            <img src="/images/CascadeIcon.png" alt="Cascada" className="icon" />
          ) : (
            <img
              src="/images/PaginadeIcon.png"
              alt="Paginada"
              className="icon"
            />
          )}
          <a>{viewMode === false ? "Cascada" : "Paginada"}</a>
        </li>
        <li onClick={() => setWidth(!width)}>
          {width === false ? (
            <img src="/images/WidthIcon.png" alt="Ancho" className="icon" />
          ) : (
            <img src="/images/NarrowIcon.png" alt="Estrecho" className="icon" />
          )}
          <a>{width === false ? "Ancho" : "Estrecho"}</a>
        </li>
        {viewMode === true ? (
          <li onClick={() => setSeparation(!separation)}>
            <img
              src="/images/SeparationIcon.png"
              alt="Separación"
              className="icon"
            />
            <a>{separation === false ? "Separación" : "Unión"}</a>
          </li>
        ) : (
          ""
        )}
        <li onClick={() => completa ? (document.exitFullscreen() ,completa=false) : (document.documentElement.requestFullscreen(),completa=true)}>
          <img
            src="/images/fullscreenIcon.png"
            alt="Estrecho"
            className="icon"
          />
          <a>Completa</a>
        </li>
      </ul>
    </nav>
  );
}

export default ChapterBar;
