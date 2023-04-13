import NavBar from "./NavBar";
import Slider from "./Slider.jsx";
import MangasOfTheMoment from "./MangasOfTheMoment";

function Home() {
  const images = [
    "/images/slider1.png",
    "/images/slider2.png",
    "/images/slider3.png",
  ];

  return (
    <>
      <NavBar />
      <Slider/>
      <MangasOfTheMoment />
    </>
  );
}

export default Home;
