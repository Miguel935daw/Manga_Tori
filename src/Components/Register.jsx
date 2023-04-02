import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
function comprobarContraseña(valor, campo) {
  //La contraseña debe tener mínimo 8 caracteres, una letra y un número
  let exp = /(?=\w*\d){1,}(?=\w*[a-zA-Z])\S{1,}/;
  if (exp.test(valor) == false) {
    campo.setCustomValidity(
      "La contraseña debe tener mínimo 8 caracteres, una letra y un número"
    );
    campo.reportValidity();
  } else {
    campo.setCustomValidity("");
    campo.reportValidity();
  }
}

function Register() {
  const navigate = useNavigate();
  //Variable para el correo
  const [email, setEmail] = useState("");
  //Variable para la contraseña
  const [password, setPassword] = useState("");
  //Variable para saber si se ha mandado el correo de confirmación
  const [showConfirmation, setShowConfirmation] = useState(false);
  //Variable para mostrar errores
  const [showError, setShowError] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Llamada a la api de supabase para registrar el usuario
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        console.log(error)
      } else {
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
          console.log(insertError)
          console.log()
          switch (insertError.code) {
            case '23505':
              setShowError(1)
              break;
            case '23503':
              setShowError(2)
              break;
          }
        } else {
          setShowConfirmation(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div >
      <NavBar/>
      {showConfirmation ? (
        <p >
          Se le ha enviado un correo de confirmación
        </p>
      ) : (
        <form onSubmit={handleSubmit} >
          <h1>Registrarse</h1>
          <label htmlFor="email">
            Correo Electrónico
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="youremail@site.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">
            Contraseña
          </label>
          <input
            required
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => comprobarContraseña(e.target.value, e.target)}
          />
          <button>
            Registrarse
          </button>
          <button
            onClick={() => navigate("/Login")}
          >
            Volver a Iniciar Sesión
          </button>
          {showError == 1 && (
            <p>
              Se le ha enviado un correo de confirmación al email que usó para
              el registro, revíselo
            </p>
          )}
          {showError == 2 && (
            <p>
              El email que está introduciendo ya ha sido registrado con éxito,
              puede volver para iniciar sesión con el botón de arriba
            </p>
          )}
        </form>
      )}
    </div>
  );
}

export default Register;
