import { useEffect } from "react";
import { useManga } from "../Context/MangaContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";

function MangasOfTheMoment() {
  const { selectManga, mangasOfTheMoment } = useManga();
  const navigate = useNavigate();
  const { theme } = useTheme();
  if (!mangasOfTheMoment) {
    return (
      <p className={
        theme === "light" ? "title Applight" : "title Appdark"
      }>Cargando...</p>
    );
  }

  return (
    <>
      <div>
        <h2 className={theme === "light" ? "title Applight" : "title Appdark"}>Mangas del momento</h2>
        <span className={theme === "light" ? "bar2 Applight" : "bar2 Appdark"}></span>
      </div>
      <div className="mangasOTM">
        {mangasOfTheMoment.map((manga) => (
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
            <h2 className={theme === "light" ? "title Applight" : "title Appdark"}>{manga.Nombre}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default MangasOfTheMoment;
