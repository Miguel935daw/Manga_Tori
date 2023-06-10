import { useEffect } from "react";
import { useManga } from "../Context/MangaContext";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useTheme } from "../Context/ThemeContext";
import supabase from "../supabase/client";
function UserList() {
  const { selectManga, UserListSelected, selectUserList } = useManga();
  const navigate = useNavigate();

  const { theme } = useTheme();
  useEffect(() => {
    if (UserListSelected) {
      console.log("Estoy cambiando")
      localStorage.setItem("UserListSelected", JSON.stringify(UserListSelected));
    }
  }, [UserListSelected]);

  useEffect(() => {
    const storedState = localStorage.getItem("UserListSelected");
    if (storedState) {
      selectUserList(JSON.parse(storedState));
    }
  }, []);

  const deleteManga = async (mangaToDelete) => {
    let newList = {List_ID: UserListSelected.List_ID, Nombre: UserListSelected.Nombre};
    newList.Mangas = UserListSelected.Mangas.filter((manga)=> manga != mangaToDelete)
    selectUserList(newList)
    const { error } = await supabase
        .from("Lista")
        .update({ Mangas:newList.Mangas })
        .eq("List_ID", newList.List_ID);
      if (error) {
        console.log(error);
      }
  };

  if (!UserListSelected) {
    return (
      <>
        <p>Cargando...</p>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div
        className={
          theme === "light" ? "mangaList Applight" : "mangaList Appdark"
        }
      >
        <div className="mangas">
          <div className="section" style={{ height: "fit-content", width: "100%", paddingBottom: "0%"}}>
            <h1 style={{ marginLeft: "3%" }}>{UserListSelected.Nombre}</h1>
          </div>
          {UserListSelected.Mangas.length == 0 ? (
            <div className="section">
              <h2 style={{ marginLeft: "10%" }}>Esta lista aún no tiene ningún manga</h2>
            </div>
          ) : (
            UserListSelected.Mangas.reduce((acc, manga, index) => {
              if (index % 3 === 0) {
                acc.push([]);
              }
              acc[acc.length - 1].push(manga);
              return acc;
            }, []).map((mangaGroup) => (
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
                    onClick={() => {
                      deleteManga(manga);
                    }}
                  >
                    Borrar manga de la lista
                  </button>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default UserList;
