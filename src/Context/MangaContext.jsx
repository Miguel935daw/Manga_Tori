import { createContext, useState, useEffect } from "react";
import supabase from "../supabase/client";

export const MangaContext = createContext();

export function MangaContextProvider(props){
    const [mangas, setMangas] = useState([]);

    const getMangas = async ()=>{
        
    }
}