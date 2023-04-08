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
      <>
        <p>Cargando...</p>
      </>
    );
  }

  return (
    <div className={theme === "light" ? "Applight" : "Appdark"}>
      <div>
        <h2 className="title">Mangas del momento</h2>
        <span className="bar2"></span>
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
            <h2 className="title">{manga.Nombre}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MangasOfTheMoment;
