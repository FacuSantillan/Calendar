//---------------------importacion de los types--------------------------------//
 import {POST_DATA,
        GUARDAR_INFORMACION,
        GET_RESERVAS,
        GET_CLIENT_NAME,
        GET_CLIENT_DATE,
        CLEAR_FILTERS,
        GET_HORARIO,
        POST_HORARIO} from "./actions";
  
//---------------------Estados iniciales--------------------------------//
  const initialState = {
    allReservas:[],
    createReserva:{},
    informacion: [],
    Reservas:[],
    reservasCopy:[],
    horarios:[],
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
            if (!action.payload || action.payload.length === 0) {
              return {
                ...state,
                Reservas: []
              };
            }
            return {
              ...state,
              Reservas: action.payload,
              reservasCopy:[...action.payload],
            };
          case GET_CLIENT_NAME:
        return {
          ...state,
          Reservas: action.payload,
        };
        case GET_CLIENT_DATE:
        return {
          ...state,
          Reservas: action.payload,
        };
        case CLEAR_FILTERS:
          return {
            ...state,
            Reservas: [...state.reservasCopy], 
          };
          case POST_HORARIO:
            return {
              ...state,
              horarios: action.payload,
            };
            case GET_HORARIO:
              return {
                ...state,
                horarios: action.payload,
              };
          default:
            return state;
          }
        };
  
export default reducer;
