import { useEffect } from "react";
import { useManga } from "../Context/MangaContext";
import { useNavigate } from "react-router-dom";
import Filter from "./Filter";
import { useTheme } from "../Context/ThemeContext";
import { useAuth } from "../Context/UserContext";
import supabase from "../supabase/client";
function MangaList() {
  const { mangas, selectManga, mangaSelected } = useManga();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { userMangaList, fetchUserMangaList } = useAuth();
  const popUp = () => {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("close").addEventListener("click", function () {
      document.getElementById("overlay").style.display = "none";
      document.getElementById("message").innerHTML = ""
    });
  };
  const compareMangas = (lista)=>{
    for (let i = 0; i < lista.length; i++) {
      const manga = lista[i];
      if (manga.Manga_ID == mangaSelected.Manga_ID) {
        return true;
      }
    }
    return false
  }
  const addToList = async ()=> {
    let listID = document.getElementById("list").value
    let listMangas = []
    const { data, error } = await supabase
        .from("Lista")
        .select("Mangas")
        .eq("List_ID", listID);
  
      if (error) {
        console.log(error);
      } else {
        listMangas = data[0].Mangas
      }
    //Si el manga seleccionado ya existe en la lista se indica en el mensaje
    if(compareMangas(listMangas)){
      document.getElementById("message").innerHTML = "El manga seleccionado ya existe en esta lista"
    }else{
      //Se actualiza la lista en la base de datos incluyendo el manga seleccionado
      listMangas.push(mangaSelected)
      const { error } = await supabase
        .from("Lista")
        .update({ Mangas: listMangas })
        .eq("List_ID", listID);
      if (error) {
        console.log(error);
      }
      document.getElementById("message").innerHTML = "El manga ha sido añadido a la lista con éxito"
      //Se espera un tiempo para que el usuario pueda ver el mensaje
      setTimeout(()=>{
        document.getElementById("close").click()
        document.getElementById("message").innerHTML = ""
      },1000)
    }
    
   }
  if (!mangas) {
    return (
      <div className={theme === "light" ? "Applight" : "Appdark"}>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div
      className={theme === "light" ? "mangaList Applight" : "mangaList Appdark"}
    >
      <div id="overlay">
        <div
          className={theme === "light" ? "message Applight" : "message Appdark"}
        >
          <div
            style={{ justifyContent: "end", display: "flex", width: "100%", textAlign: "start"}}
          >
            <img src="/images/close.png" alt="cerrar" id="close" />
          </div>
          <img src="/images/logo.png" alt="logo" className="loginLogo" />
          <label htmlFor="list" style={{width: "100%"}}>Selecciona la lista: </label>
          <select name="list" id="list" className={
                      theme === "light" ? "listSelection Applight" : "listSelection Appdark"
                    }>
            {userMangaList.map((lista) => (
              <option value={lista.List_ID}>{lista.Nombre}</option>
            ))}
          </select>
          <button onClick={ ()=> addToList()} className="addButton">Añadir</button>
          <p id="message"></p>
        </div>
      </div>
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
                  <button
                    className={
                      theme === "light" ? "addlist Applight" : "addlist Appdark"
                    }
                    onClick={()=>{
                      selectManga(manga);
                      popUp()
                    }
                    }
                  >
                    Añadir a una lista
                  </button>
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
