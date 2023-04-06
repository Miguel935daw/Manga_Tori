import { useState, useEffect, useContext } from "react";
import { useManga } from "../Context/MangaContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
function MangaChapterList() {
  const { mangaSelected, selectChapter } = useManga();
  const navigate = useNavigate();
  const { theme } = useTheme();
  if (!mangaSelected) {
    console.log(mangaSelected);
    return (
      <>
        <p>Cargando...</p>
      </>
    );
  } else {
    let chapters = Object.keys(mangaSelected.Capitulos);
    return (
      <div className="mangaChapterList">
        <h2 className="title2">Capítulos</h2>
        <span className="bar"></span>
        {chapters.map((chapter) => (
          <div
            className={theme === "light" ? "chapter Applight" : "chapter Appdark"}
            onClick={() => {
              selectChapter(chapter);
              navigate("/Chapter");
            }}
          >
            <p className="chapterNumber">Capítulo {chapter}</p>
            <img src="/images/novisto.png" alt="" className="view"/>
          </div>
        ))}
      </div>
    );
  }
}
export default MangaChapterList;
