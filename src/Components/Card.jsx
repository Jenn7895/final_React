import { useContextGlobal } from "./utils/ContextGlobal";
import { actions } from "./utils/ContextGlobal";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Card = ({ data }) => {
  const { state, dispatch } = useContextGlobal();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const isFav = state.favs.some((fav) => fav.id === data.id);
    setActive(isFav);
  }, [state.favs, data]);


  const addToFavorites = () => {
    dispatch({ type: actions.ADD_FAVORITE, payload: data });
    setActive(true);
    alert(`${data.name} ha sido agregado a favoritos.`);
  };
  
  const removeFromFavorites = () => {
    dispatch({ type: actions.REMOVE_FAVORITE, payload: data.id }); 
    setActive(false);
    alert(`${data.name} ha sido eliminado de favoritos.`);
  };
  
  const toggleFav = () => {
    if (active) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
  };

  return (
    <>
      <div className="card">
        <Link to={`/detail/${data.id}`} className="card-container">
          <img src="./images/doctor.jpg" alt={`Dentista ${data.name}`} className="img-doc" />
          <h5>{data.name}</h5>
          <h5>{data.username}</h5>
        </Link>
        <button onClick={toggleFav} className={`favButton ${active ? "removeFav" : ""}`}>
          {active ? "Eliminar de favoritos" : "Agregar a favoritos"}
        </button>
      </div>
    </>
  );
};

export default Card;
