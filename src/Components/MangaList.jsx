import { useContext, useEffect, useState } from "react";
import { MangaContext, useManga } from "../Context/MangaContext";
import { useNavigate } from "react-router-dom";
function MangaList() {
  const { mangas, mangaSelected, selectManga } = useManga();
  const navigate = useNavigate();
  useEffect(() => {}, [mangas]);

  if (!mangas) {
    return (
      <>
        <p>Cargando...</p>
      </>
    );
  }

  return (
    <div className="mangaList">
      {mangas.map((manga) => (
        <div className="section">
          <img src={manga.Portada} className="manga" onClick={()=>{selectManga(manga);navigate("/Manga")}}/>
          <p>{manga.Nombre}</p>
        </div>
      ))}
    </div>
  );
}

export default MangaList;
