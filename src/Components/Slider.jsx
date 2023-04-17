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
      return "slide0";
    } else if (index == selectedIndex + 1) {
      return "slide1";
    } else if (index == selectedIndex + 2) {
      return "slide2";
    } else if (index == selectedIndex - 1) {
      return "slide-1";
    } else if (index == selectedIndex - 2) {
      return "slide-2";
    }
  };
  const previous = () => {
    setSelectedIndex(selectedIndex-1)
  };
  const next = () => {
    setSelectedIndex(selectedIndex + 1)
  };
  const backGround = () => {
    if (selectedIndex == 0) {
      return "linear-gradient(180deg, #CB5CFF 16.91%, #3151A5 100%)";
    } else if (selectedIndex == 1) {
      return "linear-gradient(180deg, #565582 32.81%, #317BA5 100%)";
    } else {
      return "linear-gradient(180deg, #0F0404 32.81%, #4F0000 100%)";
    }
  };
  return (
    <div
      className="sliderHome"
      style={{
        backgroundImage: backGround(),
      }}
    >
      <img
        src="/images/previous.png"
        className="sliderButton1"
        onClick={() => {
          selectedIndex == 0 ? "" : previous();
        }}
        style={{ opacity: selectedIndex == 0 ? "0" : "1", width: "5%" }}
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
          selectedIndex == 2 ? "" : next();
        }}
        style={{
          opacity: selectedIndex == 2 ? "0" : "1",
          width: "5%",
        }}
      />
    </div>
  );
}

export default Slider;
