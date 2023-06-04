import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import { useAuth } from "../Context/UserContext";
import ListCreator from "./ListCreator";
import { useManga } from "../Context/MangaContext";

function Lists() {
  const { selectUserList } = useManga();
  const { userMangaList } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  if (!userMangaList) {
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
                <div
                  onClick={() => {
                    //Llevar a página de la lista
                    selectUserList(lista);
                    navigate("/Lista");
                    window.scrollTo(0, 0);
                  }}
                >
                  {lista.Mangas.length != 0 ? (
                    <img src={lista.Mangas[0].Portada} className="manga" />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "solid",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "0px",
                      }}
                    >
                      <h2
                        className={
                          theme === "light"
                            ? "titleList Applight"
                            : "titleList Appdark"
                        }
                      >
                        Sin Mangas
                      </h2>
                    </div>
                  )}

                  <h2
                    className={
                      theme === "light" ? "title Applight" : "title Appdark"
                    }
                  >
                    {lista.Nombre}
                  </h2>
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
