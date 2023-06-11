import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import NavBar from "./NavBar";
import { useTheme } from "../Context/ThemeContext";

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

  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Llamada a la api de supabase para registrar el usuario
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        console.log(error);
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
          switch (insertError.code) {
            case "23505":
              setShowError(1);
              break;
            case "23503":
              setShowError(2);
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
    <>
      <NavBar />
      <div className={theme === "light" ? "login Applight" : "login Appdark"}>
        {showConfirmation ? (
          <p style={{color: "#ff3131", fontSize: '1.5em'}}>Se le ha enviado un correo de confirmación</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={theme === "light" ? "form Applight" : "form Appdark"}
          >
            <div className="header">
              <img src="/images/logo.png" alt="logo" className="loginLogo" />
              <h2>Registrarse</h2>
            </div>
            <div>
              <label htmlFor="email">Correo Electrónico</label>
              <input
                className={
                  theme === "light" ? "input Applight" : "input Appdark"
                }
                required
                type="email"
                name="email"
                placeholder="tucorreo@algo.com"
                onChange={(e) => setEmail(e.target.value)}
                autocomplete="off"
              />
            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <input
                className={
                  theme === "light" ? "input Applight" : "input Appdark"
                }
                required
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => comprobarContraseña(e.target.value, e.target)}
              />
            </div>
            <button
              className={
                theme === "light" ? "button Applight" : "button Appdark"
              }
            >
              Registrarse
            </button>
            <div className="error">
              <p id="error">
                {showError == 1 &&
                  "Se le ha enviado un correo de confirmación al email que usó para el registro, revíselo"}
                {showError == 2 &&
                  'El email que está introduciendo ya ha sido registrado con éxito, puede iniciar sesión pulsando en "Iniciar Sesión" en la esquina superior derecha'}
              </p>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default Register;
