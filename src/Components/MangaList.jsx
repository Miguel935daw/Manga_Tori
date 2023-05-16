import { useEffect } from "react";
import { useManga } from "../Context/MangaContext";
import { useNavigate } from "react-router-dom";
import Filter from "./Filter";
import { useTheme } from "../Context/ThemeContext";

function MangaList() {
  const { mangas, mangaSelected, selectManga } = useManga();
  const navigate = useNavigate();
  useEffect(() => {}, [mangas]);

  const { theme } = useTheme();
  if (!mangas) {
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
                      console.log(manga);
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
          ))}
      </div>
      <Filter />
    </div>
  );
}

export default MangaList;
