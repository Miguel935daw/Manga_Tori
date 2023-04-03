import { createContext, useState, useEffect,useContext } from "react";
import supabase from "../supabase/client";

export const MangaContext = createContext();

export function MangaContextProvider({children}) {
  const [mangas, setMangas] = useState('');
  useEffect(() => {
    async function fetchMangas() {
        const { data, error } = await supabase.from('Mangas').select('*');
        if (error) {
          console.log(error);
        } else {
          setMangas(data);
        }
      }
  
      fetchMangas();
      
  }, []);

 return(
    <MangaContext.Provider value={mangas}>{children}</MangaContext.Provider>
 )
}

export function useManga() {
  return useContext(MangaContext);
}