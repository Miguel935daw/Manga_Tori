import Library from "./Components/Library";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import { Routes, Route} from "react-router-dom";
import "./App.css";
import MangaSection from "./Components/MangaSection";
import View from "./Components/View";
import Listas from "./Components/Listas";
import UserList from "./Components/UserList"

import { useTheme } from "./Context/ThemeContext";

function App() {
  const { theme } = useTheme();
  return (
    
      <main className={theme === "light" ? "Applight" : "Appdark"}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/Library" element={<Library />} />
          <Route path="/Manga" element={<MangaSection />} />
          <Route path="/Chapter" element={<View />} />
          <Route path="/Listas" element={<Listas />} />
          <Route path="/Lista" element={<UserList />} />
        </Routes>
      </main>
    
  );
}

export default App;
