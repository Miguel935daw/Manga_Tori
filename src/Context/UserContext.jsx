import { createContext, useState, useEffect, useContext } from "react";
import supabase from "../Supabase/client";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [userSession, setUserSession] = useState(null);
  const [userMangaList, setUserMangaList] = useState("");
  const navigate = useNavigate();
  const updateUserMangaList = function(newList){
    setUserMangaList(newList)
  }
  //Función para obtener las listas del usuario actual
  const getUserMangaList = async (userId) => {
    const { data, error } = await supabase
      .from("Lista")
      .select("Nombre, Mangas, List_ID")
      .eq("User_ID", userId);

    if (error) {
      console.log(error);
    } else {
      setUserMangaList(data)
    }
  };
  useEffect(() => {
    const { data, error } = async () => await supabase.auth.getSession();
    setUserSession(data?.user ?? null);
    
    //En caso de que cambie la sesión se redirige al usuario al inicio
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUserSession(session?.user ?? null);
        session.user!==null ? getUserMangaList(session.user.id) : setUserMangaList(null)
         if (event === 'SIGNED_OUT') {
          // El usuario ha cerrado sesión, redirigir a la página de inicio
          navigate("/")
        }
      }
    );
  }, []);

  const value = {
    userSession,
    userMangaList,
    updateUserMangaList, 
    getUserMangaList
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useAuth() {
  return useContext(UserContext);
}
