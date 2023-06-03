import { MangaContextProvider } from "../Context/MangaContext";
import NavBar from "./NavBar";
import MangaList from "./MangaList";

function Library() {
  return (
    <>
      <NavBar />
      <MangaList />
    </>
  );
}

export default  Library;
