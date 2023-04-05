import { useState, useEffect, useContext } from "react";
import { useManga } from "../Context/MangaContext";
import { useNavigate } from "react-router-dom";
function MangaChapterList() {
  const { mangaSelected, selectChapter } = useManga();
  const navigate = useNavigate();
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
        {chapters.map((chapter) => (
          <div
            className="chapter"
            onClick={() => {
              selectChapter(chapter);
              navigate("/Chapter");
            }}
          >
            <h3>Capítulo {chapter}</h3>
          </div>
        ))}
      </div>
    );
  }
}
export default MangaChapterList;
