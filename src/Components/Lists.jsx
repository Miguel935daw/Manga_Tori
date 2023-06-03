import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import { useAuth } from "../Context/UserContext";
import  ListCreator  from "./ListCreator";
import supabase from "../supabase/client";
function Lists() {
  const { userSession, userSubscription } = useAuth();
  const [userMangaList, setUserMangaList] = useState([])
  const navigate = useNavigate();
  useEffect(() => {getUserMangaList(userSession.id)}, []);

  const { theme } = useTheme();
  const getUserMangaList = async (userId) => {
    const { data, error } = await supabase
      .from("Lista")
      .select("Nombre, Mangas")
      .eq("User_ID", userId);

    if (error) {
      console.log(error);
    } else {
      setUserMangaList(data)
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
            if (index % 4 === 0) {
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
                        //Llevar a página de la lista
                        window.scrollTo(0, 0);
                      }}
                    />
                  ) : (
                    <div style={{width: "100%", height: "100%", border: "solid", justifyContent: "center", display: "flex", alignItems: "center", marginLeft: "0px"}}>
                      <h2
                        className={
                          theme === "light" ? "titleList Applight" : "titleList Appdark"
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
