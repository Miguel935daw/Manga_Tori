import { useNavigate } from "react-router-dom";
import { useChapter } from "../Context/ChapterContext";
import { useTheme } from "../Context/ThemeContext";
import { useEffect } from "react";
function ChapterBar() {
  const { theme, toggleTheme, setTheme} = useTheme();
  const { viewMode, separation, width, setViewMode, setSeparation, setWidth } =
    useChapter();
  const navigate = useNavigate();
  let completa = false;

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
        {viewMode ? (
          <li onClick={() => setWidth(!width)}>
            {width === false ? (
              <img src="/images/WidthIcon.png" alt="Ancho" className="icon" />
            ) : (
              <img
                src="/images/NarrowIcon.png"
                alt="Estrecho"
                className="icon"
              />
            )}
            <a>{width === false ? "Ancho" : "Estrecho"}</a>
          </li>
        ) : (
          ""
        )}

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
        <li
          onClick={() =>
            completa
              ? (document.exitFullscreen(), (completa = false))
              : (document.documentElement.requestFullscreen(),
                (completa = true))
          }
        >
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
