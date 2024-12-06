import { useContextGlobal } from "../Components/utils/ContextGlobal";
import Card from "../Components/Card";

const Favs = () => {
  const { state } = useContextGlobal();

  let filteredFavs = state.favs.filter((item, index, self) =>
    index === self.findIndex((t) => t.id === item.id)
  );


  return (
    <>
    <div className="favs-head">
      <h2>Dentistas Favoritos</h2>
    </div>
      
      {filteredFavs.length > 0 ? (
        <>
          <div className="card-grid">
            {filteredFavs.map((item) => (
              <Card key={item.id} data={item} />
            ))}
          </div>
         
        </>
      ) : (
        <p className="no-favs"> No hay favoritos. </p>
      )}   
    </>
  );
};

export default Favs;