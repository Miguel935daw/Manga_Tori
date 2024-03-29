import { useState, useEffect, useContext } from "react";
import { useManga } from "../Context/MangaContext";
import { useTheme } from "../Context/ThemeContext";

function MangaInfo() {
  const { mangaSelected } = useManga();
  const { theme } = useTheme();

  if (!mangaSelected) {
    return (
      <p className={
        theme === "light" ? "title Applight" : "title Appdark"
      }>Cargando...</p>
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
            <h2 className="data">Género: {mangaSelected.Género}</h2>
            <h2 className="data">Autor: {mangaSelected.Autor}</h2>
            <h2 className="data">Editorial: {mangaSelected.Editorial}</h2>
            <h2 className="data">Estado: {state}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default MangaInfo;
