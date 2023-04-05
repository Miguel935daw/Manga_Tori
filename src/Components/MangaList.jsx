import { useContext, useEffect, useState } from "react";
import { MangaContext, useManga } from "../Context/MangaContext";

function MangaList() {
  const {mangas} = useManga();
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
          <img src={manga.Portada} className="manga" />
          <p>{manga.Nombre}</p>
        </div>
      ))}
    </div>
  );
}

export default MangaList;
