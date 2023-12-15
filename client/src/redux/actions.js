import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

//------------------Creacion y exportacion de TYPES------------------//

export const POST_DATA = "POST_DATA";
export const GUARDAR_INFORMACION = "GUARDAR_INFORMACION";
export const GET_RESERVAS = 'GET_RESERVAS';
export const GET_CLIENT_NAME = 'GET_CLIENT_NAME';
export const GET_CLIENT_DATE = 'GET_CLIENT_DATE';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';
export const GET_HORARIO = 'GET_HORARIO';
export const POST_HORARIO = 'POST_HORARIO';

//---------------------------Post Data------------------------------------//
export const addReserva = (clientData) => {
    return async (dispatch) => {
        const response = await axios.post(`/postClient`, clientData);
        return dispatch({
            type: 'POST_DATA',
            payload: response.data,
        });
    };
};

//------------------------Action para guardar la informacion entre vistas---------------------------------//
export const guardarInformacion = (informacion) => {
    return {
        type: 'GUARDAR_INFORMACION',
        payload: informacion
    };
};

//------------------------Obtener todos los turnos---------------------------------//
export const getReservas = () => {
    return async (dispatch) => {
        const response = await axios.get(`/reservas`);
        return dispatch({
            type: 'GET_RESERVAS',
            payload:response.data
        })
    }
}

//---------------------------buscar por nombre------------------------------------//
export function getClientName (date) {
    return async function (dispatch) {
      try {
        const response = await axios.get(`/getName?name=${date}`);
       
        return dispatch({
          type: 'GET_CLIENT_NAME',
          payload: response.data,
        });
      } catch (error) {

    }};
  }
//---------------------------filtrar por fecha------------------------------------//
export function getByDate (date) {
    return async function (dispatch) {
      try {
        const response = await axios.get(`/getDate?date=${date}`);
        return dispatch({
          type: 'GET_CLIENT_DATE',
          payload: response.data,
        });
      } catch (error) {
        return 'xd'
    }};
  }

//---------------------------limpiar filtros------------------------------------//
export function clearFilters () {
  return async function(dispatch){
    try {
      return dispatch({
        type:'CLEAR_FILTERS',
      })
    } catch(error){
      return 'xd'
    }
  }
}
//------------------------Requerir horarios de la base de datos---------------------------------//
export const getHorarios = () => {
  return async (dispatch) => {
    const response = await axios.get(`/gethorarios`);
      return dispatch({
          type: 'GET_HORARIO',
          payload:response.data
      })
  }
}
//---------------------------Post Data------------------------------------//
export const addHorarios = (horarios) => {
  return async (dispatch) => {
      const response = await axios.post(`/posthorario`, horarios);
      return dispatch({
          type: 'POST_HORARIO',
          payload: response.data,
      });
  };
};