import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider.jsx";


function Home(){
    const images = [
        "/images/slider1.png",
        "/images/slider2.png",,
        "/images/slider3.png",,
    ];
   return  <>
        <NavBar />
        <Slider images={images}/>
    </>
}

export default Home