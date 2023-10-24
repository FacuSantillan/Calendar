import axios from 'axios';

//------------------Creacion y exportacion de TYPES------------------//

export const POST_DATA = "POST_DATA";
export const GUARDAR_INFORMACION = "GUARDAR_INFORMACION";
export const GET_RESERVAS = 'GET_RESERVAS';

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