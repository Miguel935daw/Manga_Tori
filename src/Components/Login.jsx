import { useEffect, useState } from "react";
import { supabase } from "../Supabase/client";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if(!data.user){
        document.getElementById("aviso").setAttribute("class","text-xl text-red-500")
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-blue-300 p-10 mb-4">
        <h1 className="text-2xl font-bold text-white mb-3">Iniciar Sesión</h1>
        <label htmlFor="email" className="text-white font-bold">Correo Electrónico</label>
        <input
          className="bg-slate-300 p-3 w-full mb-2"
          type="email"
          name="email"
          placeholder="youremail@site.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="text-white font-bold">Contraseña</label>
        <input
          className="bg-slate-300 p-3 w-full mb-2"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-indigo-500 px-3 py-1 text-white mr-1 rounded">Iniciar Sesión</button>
      </form>
      <button className="bg-green-500 px-3 py-1 text-white mr-1 rounded" onClick={()=> {navigate("/Manga_Tori/Register")}}>Registrarse</button>
      <h2 id="aviso" className="text-xl text-red-500 hidden">El usuario y contraseña introducidos no coinciden con ningún usuario registrado</h2>
    </div>
  );
}

export default Login;