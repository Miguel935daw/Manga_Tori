import { useState, useEffect, useContext } from "react";
import { useManga } from "../Context/MangaContext";
import { useTheme } from "../Context/ThemeContext";

function Slider() {
  const { mangaSelected } = useManga();
  const { theme } = useTheme();
  const images = [
    "/images/slider1.png",
    "/images/slider2.png",
    "/images/slider3.png",
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mostrar = (index) => {
    if (index == selectedIndex) {
      return "slide slide1";
    } else if (index == selectedIndex + 1) {
      return "slide slide2";
    } else {
      return "slide slide3";
    }
  };
  const previous = () => {
    const slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.left = parseFloat(getComputedStyle(slides[i]).left)/parseFloat(getComputedStyle(slides[i]).width)*100 + 100 + "%";
      }
  };
  const next = () => {
    const slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.left = parseFloat(getComputedStyle(slides[i]).left)/parseFloat(getComputedStyle(slides[i]).width)*100 - 100 + "%";
    }
  };
  const ocultar = (number) {
    
  }

  return (
    <div
      className="slider"
      style={{
        minHeight: "80vh",
        height: "80vh",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <img
        src="/images/previous.png"
        className="sliderButton1"
        onClick={() => {
            previous()
        }}
        style={{ opacity:  width: "5%" }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "50%",
          alignItems: "center",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {images.map((image) => (
          <img
            src={image}
            alt=""
            style={{ width: "100%", height: "100%", position: "absolute" }}
            className={mostrar(images.indexOf(image))}
          />
        ))}
      </div>
      <img
        src="/images/next.png"
        className="sliderButton2"
        onClick={() => {
            next() 
        }}
        style={{
          opacity: selectedIndex == images.length - 1 ? "0" : "1",
          width: "5%",
        }}
      />
    </div>
  );
}

export default Slider;
