import { createContext, useState, useContext } from "react";
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