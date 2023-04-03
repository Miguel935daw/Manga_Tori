import { createContext, useState, useEffect, useContext } from "react";
import supabase from "../supabase/client";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [userSession, setUserSession] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const { data, error } = async () => await supabase.auth.getSession();
    setUserSession(data?.user ?? null);
    //En caso de que cambie la sesión se redirige al usuario al inicio
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUserSession(session?.user ?? null);
          navigate("/");
      }
    );
  }, []);
  //Función que devuelve el valor del Campo Suscrito de la tabla usuarios
  const getUserSubscription = async (userId) => {
    const { data:Suscrito, error } = await supabase
      .from("Usuarios")
      .select("Suscrito")
      .eq("User_ID", userId);

    if (error) {
      console.log(error);
      return null;
    }
    
  };

  const value = {
    userSession,
    getUserSubscription,
  };
  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
}
export function useAuth() {
  return useContext(UserContext);
}
