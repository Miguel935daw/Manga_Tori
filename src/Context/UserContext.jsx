import { createContext, useState, useEffect, useContext } from "react";
import supabase from "../supabase/client";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [userSession, setUserSession] = useState(null);
  const [userSubscription, setUserSubscription] = useState(null);
  const [userMangaList, setUserMangaList] = useState("");
  const navigate = useNavigate();
  const updateUserMangaList = function(newList){
    setUserMangaList(newList)
  }
  useEffect(() => {
    const { data, error } = async () => await supabase.auth.getSession();
    setUserSession(data?.user ?? null);
    //Función para guardar el estado de la suscripción del usuario en el estado userSubscription
    const getUserSubscription = async (userId) => {
      const { data: Suscrito, error } = await supabase
        .from("Usuarios")
        .select("Suscrito")
        .eq("User_ID", userId);

      if (error) {
        console.log(error);
      } else {
        setUserSubscription(Suscrito[0].Suscrito);
      }
    };
    //Función para obtener las listas del usuario actual
    const getUserMangaList = async (userId) => {
      const { data } = await supabase
        .from("Lista")
        .select("Nombre, Mangas")
        .eq("User_ID", userId);
  
      if (error) {
        console.log(error);
      } else {
        setUserMangaList(data)
      }
    };
    //En caso de que cambie la sesión se redirige al usuario al inicio
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUserSession(session?.user ?? null);
        session.user!==null ? getUserSubscription(session.user.id) : setUserSubscription(false)
        session.user!==null ? getUserMangaList(session.user.id) : ""
         if (event === 'SIGNED_OUT') {
          // El usuario ha cerrado sesión, redirigir a la página de inicio
          navigate("/")
        }
      }
    );
  }, []);

  const value = {
    userSession,
    userSubscription,
    userMangaList,
    updateUserMangaList
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useAuth() {
  return useContext(UserContext);
}
