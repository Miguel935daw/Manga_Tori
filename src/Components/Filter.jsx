import { useContext, useEffect, useState } from "react";
import { MangaContext, useManga } from "../Context/MangaContext";
import supabase from "../supabase/client";
import { useTheme } from "../Context/ThemeContext";

function Filter() {
  const { changeGender } = useManga();
  const [genders, setGenders] = useState(null);
  const { theme } = useTheme();
  useEffect(() => {
    async function fetchGenders() {
      const { data, error } = await supabase.from("Mangas").select("Género");
      if (error) {
        console.log(error);
      } else {
        setGenders(data);
      }
    }
    fetchGenders();
  }, []);

  if (!genders) {
    
  } else {
    const uniqueGenders = [];
    genders.map((gender) => {
      if (!uniqueGenders.includes(gender.Género)) {
        uniqueGenders.push(gender.Género);
      }
    });
    return (
      <div className={theme === "light" ? "filter Applight" : "filter Appdark"}>
        <h2>Géneros</h2>
        <div className="gender">
          <label>
            <input
              name="gender"
              type="radio"
              value="Todos"
              onChange={(e) => changeGender(e.target.value)}
            />
            <span className={theme === "light" ? "Applight" : "Appdark"}>Todos</span>
          </label>
        </div>
        {uniqueGenders.map((gender) => (
          <div className="gender">
            <label>
              <input
                name="gender"
                type="radio"
                value={gender}
                onChange={(e) => changeGender(e.target.value)}
              />
              <span className={theme === "light" ? "Applight" : "Appdark"}>{gender}</span>
            </label>
          </div>
        ))}
      </div>
    );
  }
}
export default Filter;
