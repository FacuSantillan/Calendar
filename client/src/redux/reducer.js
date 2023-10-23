//---------------------importacion de los types--------------------------------//
 import {POST_DATA,
        GUARDAR_INFORMACION,
        GET_RESERVAS} from "./actions";
  
//---------------------Estados iniciales--------------------------------//
  const initialState = {
    allReservas:[],
    createReserva:{},
    informacion: [],
    Reservas:[],
  };
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case POST_DATA:
        return {
          ...state,
          allReservas: [...state.allReservas, action.payload],
          createReserva: action.payload,
        };
        case GUARDAR_INFORMACION:
          return {
            ...state,
            informacion: action.payload
          };
          case GET_RESERVAS:
          return {
            ...state,
            reservas: action.payload
          };
          default:
            return state;
          }
        };
  
export default reducer;
