import { useState, useEffect, useContext } from "react";
import { useManga } from "../Context/MangaContext";
import { useTheme } from "../Context/ThemeContext";
import { useChapter } from "../Context/ChapterContext";
function PageSlider() {
  const { mangaSelected, chapterSelected, selectChapter, setMangaSelected } =
    useManga();
  const { theme } = useTheme();
  const { viewMode, separation, width } = useChapter();
  useEffect(() => {
    if (chapterSelected) {
      localStorage.setItem("chapterSelected", JSON.stringify(chapterSelected));
    }
  }, [chapterSelected]);

  useEffect(() => {
    const storedState = localStorage.getItem("chapterSelected");
    if (storedState) {
      selectChapter(JSON.parse(storedState));
      setMangaSelected(JSON.parse(localStorage.getItem("mangaSelected")));
    }
  }, []);

  const pages = mangaSelected.Capitulos[chapterSelected];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mostrar = (index) => {
    if (index == selectedIndex) {
      return "center";
    } else if (index == selectedIndex + 1) {
      return "right1";
    } else if (index == selectedIndex - 1) {
      return "left1";
    } else if (index == selectedIndex - 2) {
      return "left2";
    } else if (index == selectedIndex + 2) {
      return "right2";
    } else {
      return "invisible";
    }
  };

  // const grande = () =>{
  //   if(document.getElementsByClassName("right1")[0].children[0].naturalWidth > 1000){
  //     document.getElementsByClassName("right1")[0].style.width = "72%"
  //     document.getElementsByClassName("right1")[0].style.left = "290px" 
  //   }else{
  //     document.getElementsByClassName("right1")[0].style.width = "36%"
  //     document.getElementsByClassName("center")[0].style.width = "30%"
  //     document.getElementsByClassName("center")[0].style.left = "597px"
  //   }
  // }
  const previous = () => {
    setSelectedIndex(selectedIndex - 1);
  };
  const next = () => {
    setSelectedIndex(selectedIndex + 1);
    
  };

  return (
    <div
      className={theme === "light" ? "chapters Applight" : "chapters Appdark"}
      style={{
        minHeight: "80vh",
        height: "80vh",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <img
        src="/images/previous.png"
        onClick={() => {
          previous();
        }}
        style={{ display: selectedIndex == 0 ? "none" : "block" }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          height: "90%",
          position: "relative",
        }}
      >
        {pages.map((page) => (
          <div className={mostrar(pages.indexOf(page))}>
            <img
              src={page}
              alt=""
              className={theme === "light" ? "page Applight" : "page Appdark"}
            />
          </div>
        ))}
      </div>
      <img
        src="/images/next.png"
        onClick={() => {
          next();
          //grande()
        }}
        style={{ display: selectedIndex == pages.length-1 ? "none" : "block" }}
      />
    </div>
  );
}

export default PageSlider;
