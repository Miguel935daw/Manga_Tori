import { useState, useEffect, useContext } from "react";
import { useManga } from "../Context/MangaContext";
import { useTheme } from "../Context/ThemeContext";

function MangaInfo() {
  const { mangaSelected } = useManga();
  const { theme } = useTheme();

  if (!mangaSelected) {
    return (
      <>
        <p>Cargando...</p>
      </>
    );
  } else {
    const state = mangaSelected.Estado == true ? "Finalizado" : "Publicándose";
    return (
      <div className="container">
        <div className={theme === "light" ? "info Applight" : "info Appdark"}>
          <img
            src={mangaSelected.Portada}
            alt="portada"
            className="portadaInfo"
          />
          <div>
            <h1>{mangaSelected.Nombre}</h1>
            <p className="sinopsis">{mangaSelected.Sinopsis}</p>
            <h2>Género: {mangaSelected.Género}</h2>
            <h2>Autor: {mangaSelected.Autor}</h2>
            <h2>Editorial: {mangaSelected.Editorial}</h2>
            <h2>Estado: {state}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default MangaInfo;
