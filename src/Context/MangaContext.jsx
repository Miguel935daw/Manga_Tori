import { createContext, useState, useEffect, useContext } from "react";
import supabase from "../supabase/client";

export const MangaContext = createContext();

export function MangaContextProvider({ children }) {
  const [mangas, setMangas] = useState("");
  const [gender, setGender] = useState("Todos");
  const [mangaSelected, setMangaSelected] = useState(null);
  const [chapterSelected, setChapterSelected] = useState(null);

  //Función anónima para cambiar el estado de gender desde fuera del contexto
  const changeGender = function (newGender) {
    setGender(newGender);
  };
  //Función anónima para cambiar el estado de mangaSelected desde fuera del contexto
  const selectManga = function (manga) {
    setMangaSelected(manga)
  };

  const selectChapter = function (chapter) {
    setChapterSelected(chapter)
  };
  useEffect(() => {
    async function fetchMangas() {
      if (gender == "Todos") {
        const { data, error } = await supabase.from("Mangas").select("*");
        if (error) {
          console.log(error);
        } else {
          setMangas(data);
        }
      } else {
        const { data, error } = await supabase
          .from("Mangas")
          .select("*")
          .eq("Género", gender);
        if (error) {
          console.log(error);
        } else {
          setMangas(data);
        }
      }
    }

    fetchMangas();
  }, [gender]);
  const value = {
    mangas,
    gender,
    mangaSelected,
    chapterSelected,
    changeGender,
    selectManga,
    selectChapter,
  };
  return (
    <MangaContext.Provider value={value}>{children}</MangaContext.Provider>
  );
}

export function useManga() {
  return useContext(MangaContext);
}
