import { useEffect } from "react";
import { useManga } from "../Context/MangaContext";
import { useNavigate } from "react-router-dom";
import Filter from "./Filter";
import { useTheme } from "../Context/ThemeContext";
import { useAuth } from "../Context/UserContext";
import supabase from "../Supabase/client";
function MangaList() {
  const { mangas, selectManga, mangaSelected } = useManga();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { userMangaList, updateUserMangaList, userSession } = useAuth();
  //Hace que aparezca el popUp para añádir un manga una lista.
  const popUp = () => {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("close").addEventListener("click", function () {
      document.getElementById("overlay").style.display = "none";
      document.getElementById("message").innerHTML = "";
    });
  };
  //Función para comprobar si un manga ya existe en una lista
  const compareMangas = (lista) => {
    for (let i = 0; i < lista.length; i++) {
      const manga = lista[i];
      if (manga.Manga_ID == mangaSelected.Manga_ID) {
        return true;
      }
    }
    return false;
  };
  
  const addToList = async () => {
    let listID = document.getElementById("list").value;
    let list = {};
    const { data, error } = await supabase
      .from("Lista")
      .select("*")
      .eq("List_ID", listID);

    if (error) {
      console.log(error);
    } else {
      list = data[0];
    }
    //Si el manga seleccionado ya existe en la lista se indica en el mensaje
    if (compareMangas(list.Mangas)) {
      document.getElementById("message").innerHTML =
        "El manga seleccionado ya existe en esta lista";
    } else {
      //Se actualiza la lista en la base de datos incluyendo el manga seleccionado
      list.Mangas.push(mangaSelected);
      const { error } = await supabase
        .from("Lista")
        .update({ Mangas: list.Mangas })
        .eq("List_ID", listID);
      if (error) {
        console.log(error);
      }
      //Creamos un array vacío que usaremos para hacer de copia del valor actual de userMangaList
      let newList = [];
      userMangaList.forEach((lista) => {
        //Cuando lleguemos al la lista a la que acabamos de añadir el manga, incluiremos la lista con el manga añadido en vez de la original
        if (lista.List_ID == list.List_ID) {
          newList.push(list);
        } else {
          newList.push(lista);
        }
      });
      //Una vez tenemos la copia con el manga añadido en la lista correspondiente asignamos el nuevo valor al estado, para que se renderice de nuevo las sección de listas
      updateUserMangaList(newList);
      document.getElementById("message").innerHTML =
        "El manga ha sido añadido a la lista con éxito";
      //Se espera un tiempo para que el usuario pueda ver el mensaje
      setTimeout(() => {
        document.getElementById("close").click();
        document.getElementById("message").innerHTML = "";
      }, 1000);
    }
  };
  if (!mangas) {
    return (
      <p className={theme === "light" ? "title Applight" : "title Appdark"}>
        Cargando...
      </p>
    );
  }

  return (
    <div
      className={theme === "light" ? "mangaList Applight" : "mangaList Appdark"}
    >
      {/* Si el usuario está registrado se crea el pop up para añadir a las listas*/}
      {userMangaList ? (
        <div id="overlay">
          <div
            className={
              theme === "light" ? "message Applight" : "message Appdark"
            }
          >
            <div
              style={{
                justifyContent: "end",
                display: "flex",
                width: "100%",
                textAlign: "start",
              }}
            >
              <img src="/images/close.png" alt="cerrar" id="close" />
            </div>
            <img src="/images/logo.png" alt="logo" className="loginLogo" />
            {//Si el usuario no tiene ninguna lista aparece otro popUp
            userMangaList.length != 0 ? (
              <>
                
                <label htmlFor="list" style={{ width: "100%" }}>
                  Selecciona la lista:{" "}
                </label>
                <select
                  name="list"
                  id="list"
                  className={
                    theme === "light"
                      ? "listSelection Applight"
                      : "listSelection Appdark"
                  }
                >
                  {userMangaList.map((lista) => (
                    <option value={lista.List_ID}>{lista.Nombre}</option>
                  ))}
                </select>
                <button onClick={() => addToList()} className="addButton">
                  Añadir
                </button>
                <p id="message"></p>
              </>
            ) : (
              <p>Aún no tienes ninguna lista</p>
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="mangas">
        {mangas
          .reduce((acc, manga, index) => {
            if (index % 3 === 0) {
              acc.push([]);
            }
            acc[acc.length - 1].push(manga);
            return acc;
          }, [])
          .map((mangaGroup) => (
            <div className="section">
              {mangaGroup.map((manga) => (
                <div>
                  <img
                    src={manga.Portada}
                    className="manga"
                    onClick={() => {
                      selectManga(manga);
                      navigate("/Manga");
                      window.scrollTo(0, 0);
                    }}
                  />
                  <h2
                    className={
                      theme === "light" ? "title Applight" : "title Appdark"
                    }
                  >
                    {manga.Nombre}
                  </h2>
                  {/* Si el usuario está registrado se muestra el botón para añádir a la lista */}
                  {userSession ? (
                    <button
                      className={
                        theme === "light"
                          ? "addlist Applight"
                          : "addlist Appdark"
                      }
                      onClick={() => {
                        selectManga(manga);
                        popUp();
                      }}
                    >
                      Añadir a una lista
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          ))}
      </div>
      <Filter />
    </div>
  );
}

export default MangaList;
