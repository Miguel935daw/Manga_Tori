import { useState, useEffect, useContext } from "react";
import JSZip from "jszip";
import { useManga } from "../Context/MangaContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import { useAuth } from "../Context/UserContext";
import supabase from "../Supabase/client";
function MangaChapterList() {
  //Importo los estados y setter necesarios
  const { mangaSelected, setMangaSelected, selectChapter } = useManga();
  const { userSession, userSubscription } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  //Estado para guardar el progreso de la lectura
  const [readingProgress, setReadingProgress] = useState([]);
  //Función para consultar el progreso de lectura del usuario actual en el manga actual
  async function fetchReadingProgress() {
    let { data: Lectura, error } = await supabase
      .from("Lectura")
      .select("Capitulos_Leidos")
      .eq("Manga_ID", mangaSelected.Manga_ID)
      .eq("User_ID", userSession.id);
    if (error) {
      console.log(error);
    } else {
      if (Lectura.length != 0) {
        setReadingProgress(Lectura[0].Capitulos_Leidos);
      }
    }
  }
  //Función para actualizar el campo Capitulos_Leidos de la tabla cada vez que se pincha en un capítulo y este no existe en el campo.
  async function updateReadingProgress() {
    console.log(readingProgress);
    const { data, error } = await supabase
      .from("Lectura")
      .update({ Capitulos_Leidos: readingProgress })
      .eq("Manga_ID", mangaSelected.Manga_ID)
      .eq("User_ID", userSession.id);
    if (error) {
      console.log(error);
    } else {
      console.log("Actualizado");
    }
  }
  //Función para hacer que aparezca el popUp
  const popUp = (chapter) => {
    if (userSubscription !== true || userSession === null) {
      document.getElementById("overlay").style.display = "block";
      document.getElementById("close").addEventListener("click", function () {
        document.getElementById("overlay").style.display = "none";
      });
    } else {
      (async () => {
        await makeProgress(chapter);
        updateReadingProgress();
        selectChapter(chapter);
        navigate("/Chapter");
      })();
    }
  };

  const downloadPopUp = (chapter, event) => {
    if (userSubscription !== true || userSession === null) {
      document.getElementById("overlay").style.display = "block";
      document.getElementById("close").addEventListener("click", function () {
        document.getElementById("overlay").style.display = "none";
      });
    } else {
      document.getElementById(chapter).innerHTML = "Descarga Comenzada";
      download(chapter);
    }
    event.stopPropagation();
  };
  //Función simple para que aparezca el ojo relleno en caso de que este capitulo haya sido leido anteriormente o ojo sin relleno en caso contrario
  const progress = (chapter) => {
    if (userSession) {
      if (readingProgress) {
        if (readingProgress.includes(chapter)) {
          return "/images/visto.png";
        } else {
          return "/images/novisto.png";
        }
      } else {
        return "/images/novisto.png";
      }
    } else {
      return "/images/novisto.png";
    }
  };
  //Función para ir añadiendo al progreso de lectura los capitulos nuevos que está leyendo el usuario
  const makeProgress = async (chapter) => {
    if (userSession) {
      if (readingProgress.length != 0) {
        console.log(readingProgress);
        if (!readingProgress.includes(chapter)) {
          readingProgress.push(chapter);
        }
      } else {
        const { data, error } = await supabase.from("Lectura").insert([
          {
            User_ID: userSession.id,
            Manga_ID: mangaSelected.Manga_ID,
            Capitulos_Leidos: [chapter],
          },
        ]);
        if (error) {
          console.log(error);
        } else {
          readingProgress.push(chapter);
        }
      }
    }
  };

  async function download(chapter) {
    // Obtener una lista de todos los objetos en la carpeta del bucket
    const { data: objects, error } = await supabase.storage
      .from("mangas")
      .list(`${mangaSelected.Nombre}/${chapter}`);

    if (error) {
      console.error(error);
      return;
    }
    const zip = new JSZip();
    let percent = 100 / objects.length;
    let contador = 1;
    document.getElementById(`container-${chapter}`).style.display = "block";

    // Recorrer la lista de objetos y descargarlos uno por uno
    for (const object of objects) {
      const { data, error } = await supabase.storage
        .from(`mangas`)
        .download(`${mangaSelected.Nombre}/${chapter}/${object.name}`);

      if (error) {
        console.error(error);
        continue;
      } else {
        document.getElementById(`progress-${chapter}`).style.width = `${
          percent * contador
        }%`;
        contador++;
      }
      zip.file(object.name, data);
    }

    zip.generateAsync({ type: "blob" }).then(function (content) {
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(content);
      downloadLink.download = `${mangaSelected.Nombre}-Capítulo${chapter}.zip`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      document.getElementById(chapter).style.color = "green";
      document.getElementById(chapter).innerHTML = "Descarga Terminada";
      document.getElementById(`container-${chapter}`).style.display = "none";
      document.getElementById(chapter).style.opacity = 0;
      document.getElementById(chapter).style.color = "red";
    });
  }

  //UseEffect para que en caso el usuario haya iniciado sesión consultar el progreso
  useEffect(() => {
    if (userSession) {
      fetchReadingProgress();
    }
  }, [mangaSelected]);

  //Use Effect para guardar el manga seleccionado en el localStorage
  useEffect(() => {
    if (mangaSelected) {
      localStorage.setItem("mangaSelected", JSON.stringify(mangaSelected));
    }
  }, [mangaSelected]);

  //UseEffect para en caso de que exista el campo mangaSelected en localStorage seleccionar ese manga
  useEffect(() => {
    const storedState = localStorage.getItem("mangaSelected");
    if (storedState) {
      setMangaSelected(JSON.parse(storedState));
    }
  }, [setMangaSelected]);

  //Use Effect para guardar el manga seleccionado en el localStorage
  useEffect(() => {
    if (readingProgress.length != 0) {
      localStorage.setItem("readingProgress", JSON.stringify(readingProgress));
    }
  }, [readingProgress]);

  //UseEffect para en caso de que exista el campo readingProgress en localStorage seleccionar ese progreso
  useEffect(() => {
    const storedState = localStorage.getItem("readingProgress");
    if (storedState) {
      setReadingProgress(JSON.parse(storedState));
    }
  }, [setReadingProgress]);

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
            <div
              style={{ justifyContent: "end", display: "flex", width: "100%" }}
            >
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              className={
                theme === "light" ? "chapter Applight" : "chapter Appdark"
              }
              onClick={
                index >= 5
                  ? () => popUp(chapter)
                  : async () => {
                      await makeProgress(chapter);
                      updateReadingProgress();
                      selectChapter(chapter);
                      navigate("/Chapter");
                    }
              }
            >
              <p className="chapterNumber">Capítulo {chapter}</p>
              <div className="actions">
                <img src={progress(chapter)} alt="" className="view" />
                <img
                  src="/images/download.png"
                  alt=""
                  className="download"
                  onClick={(event) => {
                    document.getElementById(chapter).style.opacity = 1;
                    downloadPopUp(chapter, event);
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "20%",
                alignItems: "center",
                justifyContent: "left",
                gap: "10px",
              }}
            >
              <p id={chapter} className="downloadMessage"></p>
              <div
                style={{
                  width: "50%",
                  height: "fit-content",
                  border: "2px solid black",
                  display: "none",
                }}
                id={"container-" + chapter}
              >
                <span className="progressBar" id={"progress-" + chapter}></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default MangaChapterList;
