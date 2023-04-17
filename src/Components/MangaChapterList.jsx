import { useState, useEffect, useContext } from "react";
import { useManga } from "../Context/MangaContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import { useAuth } from "../Context/UserContext";
function MangaChapterList() {
  //Importo los estados y setter necesarios
  const { mangaSelected, setMangaSelected, selectChapter } = useManga();
  const { userSession, userSubscription } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  //Función para hacer que aparezca el popUp
  const popUp = (chapter) => {
    if (userSubscription !== true || userSession === null) {
      document.getElementById("overlay").style.display = "block";
      document.getElementById("close").addEventListener("click", function () {
        document.getElementById("overlay").style.display = "none";
      });
    } else {
      selectChapter(chapter);
      navigate("/Chapter");
    }
  };
  //Use Effect para guardar el manga seleccionado en el localStorage
  useEffect(() => {
    if (mangaSelected) {
      localStorage.setItem("mangaSelected", JSON.stringify(mangaSelected));
    }
  }, [mangaSelected]);

  useEffect(() => {
    const storedState = localStorage.getItem("mangaSelected");
    if (storedState) {
      setMangaSelected(JSON.parse(storedState));
    }
  }, [setMangaSelected]);

  if (!mangaSelected) {
    return (
      <>
        <p>Cargando...</p>
      </>
    );
  } else {
    let chapters = Object.keys(mangaSelected.Capitulos);
    return (
      //Elemento para el Pop Up
      <div className="mangaChapterList">
        <div id="overlay">
          <div
            className={
              theme === "light" ? "message Applight" : "message Appdark"
            }
          >
            <div style={{justifyContent:"end", display: "flex", width: "100%"}}>
              <img src="/images/close.png" alt="cerrar" id="close" />
            </div>
            <img src="/images/logo.png" alt="logo" className="loginLogo" />
            <p>
              Parece que no estas suscrito, así solo podrás acceder a los 5
              primeros capítulos de nuestros mangas. Recuerda que suscribiéndote
              no solo obtienes acceso a todo nuestro catálogo, sino que también
              obtienes otras ventajas tales como la posibilidad de descargar los
              capítulos que quieras y crear tus propias listas.
            </p>
            <button className="suscribe">Suscribirse</button>
          </div>
        </div>

        <h2 className={theme === "light" ? "title Applight" : "title Appdark"}>
          Capítulos
        </h2>
        <span
          className={theme === "light" ? "bar Applight" : "bar Appdark"}
        ></span>
        {chapters.map((chapter, index) => (
          <div
            className={
              theme === "light" ? "chapter Applight" : "chapter Appdark"
            }
            onClick={
              index >= 5
                ? () => popUp(chapter)
                : () => {
                    selectChapter(chapter);
                    navigate("/Chapter");
                  }
            }
          >
            <p className="chapterNumber">Capítulo {chapter}</p>
            <img src="/images/novisto.png" alt="" className="view" />
          </div>
        ))}
      </div>
    );
  }
}
export default MangaChapterList;
