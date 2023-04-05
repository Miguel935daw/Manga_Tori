import { MangaContextProvider } from "../Context/MangaContext";
import NavBar from "./NavBar";
import MangaList from "./MangaList";
import Filter from "./Filter";
function Biblioteca(){
    return <>
        <NavBar />  
            <MangaList/>
            <Filter/>
    </>
}

export default Biblioteca