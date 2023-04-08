import { useState, useEffect, useContext } from "react";
import { useManga } from "../Context/MangaContext";
import { useNavigate } from "react-router-dom";
function ChapterView() {
  const { mangaSelected, chapterSelected, selectChapter, setMangaSelected } = useManga();
  const navigate = useNavigate();
  useEffect(() => {
    if (chapterSelected) {
      localStorage.setItem("chapterSelected", JSON.stringify(chapterSelected));
    }
  }, [chapterSelected]);

  useEffect(() => {
    const storedState = localStorage.getItem("chapterSelected");
    if (storedState) {
      selectChapter(JSON.parse(storedState));
      setMangaSelected(JSON.parse(localStorage.getItem("mangaSelected")))
    }
  }, []);
  if (!chapterSelected) {
    return (
      <>
        <p>Cargando...</p>
      </>
    );
  } else {
    return (
      <>
        {mangaSelected.Capitulos[chapterSelected].map((page) => (
          <div>
            <img
              src={page}
              alt=""
              className="page"
              style={{ border: "5px solid black" }}
            />
          </div>
        ))}
      </>
    );
  }
}

export default ChapterView;
