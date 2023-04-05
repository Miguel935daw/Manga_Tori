import { useManga } from "../Context/MangaContext";
function ChapterView() {
  const { mangaSelected, chapterSelected } = useManga();
  if (!chapterSelected) {
    return (
      <>
        <p>Cargando...</p>
      </>
    );
  } else {
    return (
      <>
        {mangaSelected.Capitulos[chapterSelected].map((page) => (
          <div >
          <img src={page} alt="" className="page" style={{border: "5px solid black"}}/>
          </div>
        ))}
      </>
    );
  }
}

export default ChapterView;
