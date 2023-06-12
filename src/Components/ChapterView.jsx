import { useState, useEffect, useContext } from "react";
import { useManga } from "../Context/MangaContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import { useChapter } from "../Context/ChapterContext";
import PageSlider from "./PageSlider";
function ChapterView() {
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
  if (!chapterSelected) {
    return (
      <>
       <p className={
        theme === "light" ? "title Applight" : "title Appdark"
      }>Cargando...</p>
      </>
    );
  } else {
    if (!viewMode) {
      return (
        <div
          className={theme === "light" ? "Applight" : "Appdark"}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "90vh"
          }}
        >
          <PageSlider />
        </div>
      );
    }
    return (
      <div
        className={theme === "light" ? "Applight" : "Appdark"}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className={
            theme === "light" ? "chapters Applight" : "chapters Appdark"
          }
        >
          {mangaSelected.Capitulos[chapterSelected].map((page) => (
            <div
              style={{
                width: width === false ? "50%" : "100%",
                marginBottom: separation === false ? "0px" : "4%",
                marginTop: viewMode ? "4%" : "0%"
              }}
            >
              <img
                src={page}
                alt=""
                className={theme === "light" ? "page Applight" : "page Appdark"}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ChapterView;
