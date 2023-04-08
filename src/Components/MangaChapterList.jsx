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
          <div id="message">
            <p>
              Para poder leer sin límites debes disfrutar de nuestra
              suscripción, sin ella solo podrás acceder a los 5 primeros
              capítulos de nuestros mangas.
            </p>
            <button id="close">Cerrar</button>
          </div>
        </div>

        <h2 className="title2">Capítulos</h2>
        <span className="bar"></span>
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
