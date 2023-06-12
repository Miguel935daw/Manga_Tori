import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import { useAuth } from "../Context/UserContext";
import ListCreator from "./ListCreator";
import { useManga } from "../Context/MangaContext";
import supabase from "../Supabase/client";
function Lists() {
  const { selectUserList } = useManga();
  const { userMangaList, updateUserMangaList, getUserMangaList, userSession } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const deleteList = async (listToDelete) => {
    let listID = listToDelete.List_ID
    let newList = userMangaList.filter((list) => list != listToDelete);
    updateUserMangaList(newList);
    const { error } = await supabase
      .from("Lista")
      .delete()
      .eq("List_ID", listID);
    if (error) {
      console.log(error);
    }
  };
  if (!userMangaList) {
    return (
      <>
        <p>Cargando...</p>
      </>
    );
  }
  return (
    <div
      className={theme === "light" ? "mangaList Applight" : "mangaList Appdark"}
    >
      <div className="mangas">
        {userMangaList
          .reduce((acc, lista, index) => {
            if (index % 3 === 0) {
              acc.push([]);
            }
            acc[acc.length - 1].push(lista);
            return acc;
          }, [])
          .map((listaGroup) => (
            <div className="section">
              {listaGroup.map((lista) => (
                <div>
                  {lista.Mangas.length != 0 ? (
                    <img
                      src={lista.Mangas[0].Portada}
                      className="manga"
                      onClick={() => {
                        selectUserList(lista);
                        navigate("/Lista");
                        window.scrollTo(0, 0);
                      }}
                    />
                  ) : (
                    <img
                      src={
                        theme === "light"
                          ? "images/emptyListLight.png"
                          : "images/emptyListDark.png"
                      }
                      className="manga"
                      onClick={() => {
                        selectUserList(lista);
                        navigate("/Lista");
                        window.scrollTo(0, 0);
                      }}
                    />
                  )}

                  <h2
                    className={
                      theme === "light" ? "title Applight" : "title Appdark"
                    }
                  >
                    {lista.Nombre}
                  </h2>
                  <button
                    className={
                      theme === "light" ? "addlist Applight" : "addlist Appdark"
                    }
                    onClick={() => {
                      deleteList(lista);
                    }}
                  >
                    Borrar lista
                  </button>
                </div>
              ))}
            </div>
          ))}
      </div>
      <ListCreator />
    </div>
  );
}

export default Lists;
