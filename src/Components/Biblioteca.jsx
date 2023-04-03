import { MangaContextProvider } from "../Context/MangaContext";
import NavBar from "./NavBar";
import MangaList from "./MangaList";
function Biblioteca(){
    return <>
        <NavBar />
        <MangaContextProvider>
            <MangaList/>
        </MangaContextProvider>
    </>
}

export default Biblioteca