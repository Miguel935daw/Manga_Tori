import { createContext, useState, useEffect, useContext } from "react";
import supabase from "../supabase/client";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [userSession, setUserSession] = useState(null);
  const [userSubscription, setUserSubscription] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const { data, error } = async () => await supabase.auth.getSession();
    setUserSession(data?.user ?? null);
    //En caso de que cambie la sesión se redirige al usuario al inicio
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUserSession(session?.user ?? null);
        setUserSubscription(false)
        navigate("/");
      }
    );
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
  }, []);

  const value = {
    userSession,
    userSubscription,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useAuth() {
  return useContext(UserContext);
}
