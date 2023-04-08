import { createContext, useState, useEffect, useContext } from "react";
import supabase from "../supabase/client";

export const MangaContext = createContext();

export function MangaContextProvider({ children }) {
  const [mangas, setMangas] = useState("");
  const [gender, setGender] = useState("Todos");
  const [mangaSelected, setMangaSelected] = useState(null);
  const [chapterSelected, setChapterSelected] = useState(null);
  const [mangasOfTheMoment, setMangasOfTheMoment] = useState(null);

  //Función anónima para cambiar el estado de gender desde fuera del contexto
  const changeGender = function (newGender) {
    setGender(newGender);
  };
  //Función anónima para cambiar el estado de mangaSelected desde fuera del contexto
  const selectManga = function (manga) {
    updateVisits(manga);
    setMangaSelected(manga);
  };

  const selectChapter = function (chapter) {
    setChapterSelected(chapter);
  };
  async function updateVisits(manga) {
    const { data } = await supabase
      .from("Mangas")
      .select("Visitas")
      .eq("Manga_ID", manga.Manga_ID);
    let newVisits = data[0].Visitas + 1;
    const { error } = await supabase
      .from("Mangas")
      .update({ Visitas: newVisits })
      .eq("Manga_ID", manga.Manga_ID);
    if (error) {
      console.log(error);
    } else {
      console.log(error);
    }
  }
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
    async function fetchMangasOfTheMoment() {
      const { data, error } = await supabase
        .from("Mangas")
        .select("*")
        .order("Visitas", { ascending: false })
        .limit(3);
      if (error) {
        console.log(error);
      } else {
        setMangasOfTheMoment(data);
      }
    }
    fetchMangas();
    fetchMangasOfTheMoment();
  }, [gender,mangaSelected]);
  const value = {
    mangas,
    gender,
    mangaSelected,
    chapterSelected,
    mangasOfTheMoment,
    setMangaSelected,
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
