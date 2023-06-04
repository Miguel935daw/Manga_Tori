import { useEffect } from "react";
import { useManga } from "../Context/MangaContext";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useTheme } from "../Context/ThemeContext";

function UserList() {
  const { selectManga, UserListSelected, selectUserList } = useManga();
  const navigate = useNavigate();

  const { theme } = useTheme();
  useEffect(() => {
    if (UserListSelected) {
      localStorage.setItem("UserListSelected", JSON.stringify(UserListSelected));
    }
  }, [UserListSelected]);

  useEffect(() => {
    const storedState = localStorage.getItem("UserListSelected");
    if (storedState) {
      selectUserList(JSON.parse(storedState));
    }
  }, []);
  if (!UserListSelected) {
    return (
      <div className={theme === "light" ? "Applight" : "Appdark"}>
        <p>Cargando...</p>
      </div>
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
        <div className="userList">
          <div className="section" style={{ height: "fit-content" }}>
            <h1 style={{ marginLeft: "10%" }}>{UserListSelected.Nombre}</h1>
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
