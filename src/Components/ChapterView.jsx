import { useState, useEffect, useContext } from "react";
import { useManga } from "../Context/MangaContext";
function ChapterView() {
  const { mangaSelected, chapterSelected, selectChapter, setMangaSelected } = useManga();
  useEffect(() => {
    if (chapterSelected) {
      localStorage.setItem("chapterSelected", JSON.stringify(chapterSelected));
    }
  }, [chapterSelected]);

  useEffect(() => {
    const storedState = localStorage.getItem("chapterSelected");
    const storedState2 = localStorage.getItem("mangaSelected")
    if (storedState) {
      selectChapter(JSON.parse(storedState));
      setMangaSelected(JSON.parse(storedState2))
    }
  }, [selectChapter]);
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
