import MangaInfo from "./MangaInfo";
import MangaChapterList from "./MangaChapterList";
import NavBar from "./NavBar";
import { useTheme } from "../Context/ThemeContext";
function MangaSection() {
  return (
    <>
      <NavBar />
      <MangaInfo />
      <MangaChapterList />
    </>
  );
}

export default MangaSection;
