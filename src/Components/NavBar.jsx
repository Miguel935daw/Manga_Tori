import { useEffect, useState, useContext } from "react";
import supabase from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { UserContext, useAuth } from "../Context/UserContext";
import "../styles/styles.css";

function NavBar() {
  const { userSession, userSubscription } = useAuth();
  const navigate = useNavigate();
  const subcription = userSubscription == true ? "Suscriptor" : "No Suscriptor";
  if (userSession !== null) {
    return (
      <nav>
        <img
          src="/images/logo.png"
          alt="logo"
          className="logo"
          onClick={() => navigate("/")}
        />
        <ul>
          <li>
            <a>{subcription}</a>
          </li>
          <li>
            <a onClick={() => navigate("/Biblioteca")}>Biblioteca</a>
          </li>
          <li>
            <a onClick={() => supabase.auth.signOut()}>Cerrar Sesión</a>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav>
      <img
        src="/images/logo.png"
        alt="logo"
        className="logo"
        onClick={() => navigate("/")}
      />
      <ul>
        <li>
          <a onClick={() => navigate("/Biblioteca")}>Biblioteca</a>
        </li>
        <li>
          <a onClick={() => navigate("/Login")}>Iniciar Sesión</a>
        </li>
        <li>
          <a onClick={() => navigate("/Register")}>Registrarse</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
