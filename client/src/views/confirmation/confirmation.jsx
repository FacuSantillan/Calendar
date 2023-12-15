import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { guardarInformacion, addReserva } from "../../redux/actions";

import logo from '../../assets/logopel.png'
import style from './confirmation.module.css'

function Confirmation({guardarInformacion}) {
    const navigate = useNavigate();
    const informacion = useSelector(state => state.informacion);
    const dispatch = useDispatch();

    const [clientData, setClientData] = useState({
        nombre: informacion.nombre,
        apellido: informacion.apellido,
        telefono: informacion.telefono,
        turnos:{
            hora:informacion.turnos.hora,
            fecha:informacion.turnos.fecha,
            servicios:[informacion.turnos.servicios]
        }
    });

    useEffect(()=>{
      if(clientData.nombre === undefined || clientData.apellido=== undefined || clientData.telefono=== undefined){
        navigate('/');
      }
    },[])
    
       const handleSubmit = (event) => {
            event.preventDefault();
            dispatch(addReserva(clientData)).then(() => {
                navigate('/success');
            });
          }
  
      const turnoData = (event) => {
        guardarInformacion(clientData);
          navigate('/calendar')
      };

      const cadenaSeparadaPorComas = clientData.turnos.servicios.join(", ");

    return (
        <div className={style.container}>


        <h1 className={style.title}>Datos del turno:</h1>
        <h3 className={style.subtitle}>Turno seleccionado para el: {clientData.turnos.fecha}</h3>
        <h3 className={style.subtitle}>A las: {clientData.turnos.hora}</h3>
        <h3 className={style.subtitle}>Para: {cadenaSeparadaPorComas}</h3>
        <div className={style.buttonContainer}>
          <button className={`${style.button} ${style.confirm}`} onClick={handleSubmit}>Confirmar</button>
          <button className={`${style.button} ${style.back}`} onClick={turnoData}>Atras</button>
        </div>
      </div>
    );
}
export default connect(null, { guardarInformacion })(Confirmation);