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
    //Función para guardar el estado de la suscripción del usuario en el estado userSubscription
    const getUserSubscription = async (userId) => {
      console.log("Hola")
      const { data: Suscrito, error } = await supabase
        .from("Usuarios")
        .select("Suscrito")
        .eq("User_ID", userId);

      if (error) {
        console.log(error);
      } else {
        console.log(Suscrito[0].Suscrito)
        setUserSubscription(Suscrito[0].Suscrito);
      }
    };
    //En caso de que cambie la sesión se redirige al usuario al inicio
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUserSession(session?.user ?? null);
        session.user!==null ? getUserSubscription(session.user.id) : setUserSubscription(false)
        navigate("/");
      }
    );
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
