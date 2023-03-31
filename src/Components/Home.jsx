import { useEffect, useState } from "react";
import supabase from "../supabase/client";
import { useNavigate } from "react-router-dom";

function Home() {
  const [showTaskDone, setShowTaskDone] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <button
        className="bg-indigo-500 px-3 py-1 text-white mr-1 rounded m-2"
        onClick={() => navigate("/Manga_Tori/Login")}
      >
        Iniciar Sesión
      </button>
      <button
        className="bg-indigo-500 px-3 py-1 text-white mr-1 rounded m-2"
        onClick={() => navigate("/Manga_Tori/Register")}
      >
        Registrarse
      </button>
    </>
  );
}

export default Home;
