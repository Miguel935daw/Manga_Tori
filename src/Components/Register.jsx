import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

function comprobarContraseña(valor, campo) {
  let exp = /^[A-Za-z\d]{8,}$/
  console.log(valor)
  if (exp.test(valor) == false) {
      campo.setCustomValidity("La contraseña debe tener mínimo 8 caracteres, una letra y un número")
      campo.reportValidity() 
  }else{
    campo.setCustomValidity('')
    campo.reportValidity()
  } 
}

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if(error){
        console.log('Error signing up: ', error);
      }else{
            const values = {
              User_ID: data.user.id,
              Email: data.user.email,
              Suscrito: false,
            };
          
            // Insertar los valores en la tabla creada
            const { data: insertData, error: insertError } = await supabase
            .from("Usuarios")
            .insert(values);
        
          if (insertError) {
            console.log("Error inserting data:", insertError);
          } else {
            console.log("Data inserted:", insertData);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-blue-300 p-10 mb-4">
        <h1 className="text-2xl font-bold text-white mb-3">Registrarse</h1>
        <label htmlFor="email" className="text-white font-bold">
          Correo Electrónico
        </label>
        <input
          required
          className="bg-slate-300 p-3 w-full mb-2"
          type="email"
          name="email"
          placeholder="youremail@site.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="text-white font-bold">
          Contraseña
        </label>
        <input
          required
          className="bg-slate-300 p-3 w-full mb-2"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) => comprobarContraseña(e.target.value, e.target)}
        />
        <button className="bg-indigo-500 px-3 py-1 text-white mr-1 rounded m-2">
          Registrarse
        </button>
        <button
          className="bg-indigo-500 px-3 py-1 text-white mr-1 rounded m-2"
          onClick={() => navigate("/Manga_Tori/Login")}
        >
          Volver a Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Register;