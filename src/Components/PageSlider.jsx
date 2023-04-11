import { useState, useEffect, useContext } from "react";
import { useManga } from "../Context/MangaContext";
import { useTheme } from "../Context/ThemeContext";
import { useChapter } from "../Context/ChapterContext";
function PageSlider() {
  const { mangaSelected, chapterSelected, selectChapter, setMangaSelected } =
    useManga();
  const { theme } = useTheme();
  const { viewMode, separation, width } = useChapter();
  useEffect(() => {
    if (chapterSelected) {
      localStorage.setItem("chapterSelected", JSON.stringify(chapterSelected));
    }
  }, [chapterSelected]);

  useEffect(() => {
    const storedState = localStorage.getItem("chapterSelected");
    if (storedState) {
      selectChapter(JSON.parse(storedState));
      setMangaSelected(JSON.parse(localStorage.getItem("mangaSelected")));
    }
  }, []);

  const pages = mangaSelected.Capitulos[chapterSelected];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const ancho = (index) => {
    if (index == selectedIndex) {
      return "50%";
    } else if (index == selectedIndex + 1 || index == selectedIndex - 1) {
      return "30%";
    } else {
      return "17%";
    }
  };

  const mostrar = (index) => {
    if (
      index == selectedIndex ||
      index == selectedIndex - 1 ||
      index == selectedIndex - 2 ||
      index == selectedIndex + 1 ||
      index == selectedIndex + 2
    ) {
      return "block";
    } else {
      return "none";
    }
  };

  const sombrear = (index) => {
     if (index == selectedIndex + 1 || index == selectedIndex - 1) {
      return "linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8));";
    } else if(index == selectedIndex + 2 || index == selectedIndex - 2 ){
      return "linear-gradient(0deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9))";
    }else{
        return "none"
    }
  };

  const previous = () => {
    setSelectedIndex(selectedIndex - 1);
  };
  const next = () => {
    setSelectedIndex(selectedIndex + 1);
  };

  console.log(pages.length);

  return (
    <>
      <button
        onClick={() => {
          previous();
          console.log(selectedIndex);
        }}
        style={{ display: selectedIndex == 0 ? "none" : "block" }}
      >
        Atrás
      </button>
      <button
        onClick={() => {
          next();
          console.log(selectedIndex);
        }}
        style={{ display: selectedIndex == pages.length ? "none" : "block" }}
      >
        Adelante
      </button>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {pages.map((page) => (
          <div
            style={{
              width: ancho(pages.indexOf(page)),
              display: mostrar(pages.indexOf(page)),
            }}
          >
            <img
              src={page}
              alt=""
              className={theme === "light" ? "page Applight" : "page Appdark"}
              style={{background: sombrear(pages.indexOf(page))}}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default PageSlider;
