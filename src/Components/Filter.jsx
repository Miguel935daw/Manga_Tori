import { useContext, useEffect, useState } from "react";
import { MangaContext, useManga } from "../Context/MangaContext";
import supabase from "../supabase/client";

function Filter() {
  const {changeGender} = useManga();
  const [genders, setGenders] = useState(null);
  useEffect(() => {
    async function fetchGenders() {
      const { data, error } = await supabase.from("Mangas").select("Género");
      if (error) {
        console.log(error);
      } else {
        setGenders(data);
      }
    }
    fetchGenders()
  }, []);

  if (!genders) {
    console.log(genders);
  } else {
    const uniqueGenders = []
    genders.map((gender) => {
        if(!uniqueGenders.includes(gender.Género)){
            uniqueGenders.push(gender.Género)
        }
    })
    return (
      <div>
        {uniqueGenders.map((gender)=>(
            <>
            <input
              name="gender"
             type="radio"
              value={gender}
              onChange={(e) => changeGender(e.target.value)}
            />
            <label htmlFor="gender">{gender}</label>
          </>
        ))}
        <input
              name="gender"
             type="radio"
              value="Todos"
              onChange={(e) => changeGender(e.target.value)}
            />
            <label htmlFor="gender">Todos</label>
      </div>
    );
  }
}
export default Filter;
