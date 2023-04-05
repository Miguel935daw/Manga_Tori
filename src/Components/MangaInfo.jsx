import { useState, useEffect, useContext } from "react";
import { useManga } from "../Context/MangaContext";

function MangaInfo() {
  const { mangaSelected } = useManga();
//   const [currentManga, setCurrentManga] = useState(null)

  if (!mangaSelected) {
    console.log(mangaSelected)
    return (
      <>
        <p>Cargando...</p>
      </>
    );
  } else {
    const state = mangaSelected.Estado == true ? "Finalizado" : "Publicándose";
    return (
      <div className="info">
        <div>
          <img src={mangaSelected.Portada} alt="portada" className="portadaInfo"/>
        </div>
        <div>
          <h1>{mangaSelected.Nombre}</h1>
          <h2>Sinopsis</h2>
          <p>{mangaSelected.Sinopsis}</p>
          <h2>Género</h2>
          <p>{mangaSelected.Género}</p>
          <h2>Estado</h2>
          <p>{state}</p>
          <h2>Autor</h2>
          <p>{mangaSelected.Autor}</p>
          <h2>Editorial</h2>
          <p>{mangaSelected.Editorial}</p>
        </div>
      </div>
    );
  }
}

export default MangaInfo;
