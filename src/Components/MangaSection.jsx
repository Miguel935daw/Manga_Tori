import MangaInfo from "./MangaInfo";
import MangaChapterList from "./MangaChapterList";
import NavBar from "./NavBar";
import { useTheme } from "../Context/ThemeContext";
function MangaSection() {
  const { theme } = useTheme();
  return (
    <div className={theme === "light" ? "Applight" : "Appdark"}>
      <NavBar />
      <MangaInfo />
      <MangaChapterList />
    </div>
  );
}

export default MangaSection;
