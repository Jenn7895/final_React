import axios from "axios";
import { useReducer, useEffect, createContext, useContext, useMemo } from "react";


export const actions = {
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  CHANGE_THEME: 'CHANGE_THEME',
  SET_DENTIST: 'SET_DENTIST', 
};


export const initialState = {
  theme: "light",
  favs: [],
  dentist: []
};


const reducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_FAVORITE:
      return {
        ...state,
        favs: [...state.favs, action.payload],
      };
      case actions.REMOVE_FAVORITE:
        return {
            ...state,
            favs: state.favs.filter(fav => fav.id !== action.payload)
        };
    case actions.CHANGE_THEME:
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
      case 'SET_DENTIST':
  return {
    ...state,
    dentist: action.payload,
  };
    default:
      return state;
  }
};

export const ContextGlobal = createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const KEY = "card.info";
    localStorage.setItem(KEY, JSON.stringify(state.favs));
  }, [state.favs]);

  useEffect(() => {
    const fetchDentist = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      
        dispatch({ type: 'SET_DENTIST', payload: response.data });
      } catch (error) {
        console.error("Error al cargar información de dentistas", error);
      }
    };
    
    fetchDentist();
  }, []);


  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <ContextGlobal.Provider value={value}>
      {children}
    </ContextGlobal.Provider>
  );
};

export default ContextProvider;


export const useContextGlobal = () => useContext(ContextGlobal);
