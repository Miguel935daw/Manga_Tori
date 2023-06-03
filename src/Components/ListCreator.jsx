import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import { useAuth } from "../Context/UserContext";
import supabase from "../supabase/client";
function ListCreator() {
  const { userSession } = useAuth();
  

  const { theme } = useTheme();
  //Función para hacer que aparezca el popUp
  const popUp = () => {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("close").addEventListener("click", function () {
      document.getElementById("overlay").style.display = "none";
    });
  };
  async function createList() {
    let nombresExistentes = [];
    userMangaList.forEach((mangaList) => {
      nombresExistentes.push(mangaList.Nombre);
    });
    let nombre = document.getElementById("ListName").value.trim();
    if (nombresExistentes.includes(nombre)) {
      document.getElementById("error").innerHTML =
        "Ya existe una lista con el nombre introducido";
    } else {
      const { data, error } = await supabase.from("Lista").insert([
        {
          User_ID: userSession.id,
          Nombre: nombre,
          Mangas: [],
        },
      ]);
      if (error) {
        console.log(error);
      } else {
        
      }
      document.getElementById("error").innerHTML = "Lista creada con éxito";
      document.getElementById("overlay").style.display = "none";
    }
  }
  return (
    <>
      <div id="overlay">
        <div
          className={
            theme === "light"
              ? "createListMessage Applight"
              : "createListMessage Appdark"
          }
        >
          <div
            style={{ justifyContent: "end", display: "flex", width: "100%" }}
          >
            <img src="/images/close.png" alt="cerrar" id="close" />
          </div>
          <div
            style={{ display: "flex", marginTop: "10%", marginBottom: "10%" }}
          >
            <label htmlFor="ListName">Nombre: </label>
            <input
              type="text"
              name="ListName"
              id="ListName"
              className={theme === "light" ? "input Applight" : "input Appdark"}
            />
          </div>

          <button className="suscribe" onClick={() => createList()}>
            Crear lista
          </button>

          <p id="error"></p>
        </div>
      </div>
      <button
        className={theme === "light" ? "filter Applight" : "filter Appdark"}
        style={{ cursor: "pointer", display: "flex" }}
        onClick={() => popUp()}
      >
        <img src="/images/AddList.png" alt="" className="view" />
        <h2 className={theme === "light" ? "Applight" : "Appdark"}>
          Crear Lista
        </h2>
      </button>
    </>
  );
}

export default ListCreator;
