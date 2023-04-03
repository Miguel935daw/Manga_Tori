import { useContext, useEffect, useState } from "react";
import { MangaContext, useManga } from "../Context/MangaContext";

function MangaList() {
  const mangas = useManga();
  const [genero, setGenero] = useState(null);
  useEffect(() => {}, [mangas]);

  if (!mangas) {
    return (
      <>
        <p>Cargando...</p>
      </>
    );
  } else {
    // return (
    //   <div>
    //     {mangas.map((manga) => (
    //       <>
    //         <input
    //           type="radio"
    //           id={manga.Género}
    //           name="radio-group"
    //           value={manga.Género}
    //           onChange={setGenero(manga.Género)}
    //         />
    //         <label htmlFor={manga.Género}>{manga.Género}</label>
    //       </>
    //     ))}
    //   </div>
    // );

    return (
      <div>
        {mangas.map((manga) => (
          <>
            <img src={manga.Portada} className="manga" />
            <p>{manga.Nombre}</p>
          </>
        ))}
      </div>
    );
  }
}

export default MangaList;
