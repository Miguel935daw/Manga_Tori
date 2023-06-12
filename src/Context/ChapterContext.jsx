import { createContext, useState, useEffect, useContext } from "react";
import supabase from "../Supabase/client";
export const ChapterContext = createContext();

export function ChapterContextProvider({ children }){
    const [viewMode, setViewMode] = useState(false) //False = Paginada, True = Cascada
    const [separation, setSeparation] = useState(true)
    const [width, setWidth] = useState(false)
    const value = {
        viewMode,
        separation,
        width,
        setViewMode,
        setSeparation,
        setWidth
      };
      return (
        <ChapterContext.Provider value={value}>{children}</ChapterContext.Provider>
      );
}

export function useChapter() {
    return useContext(ChapterContext);
  }