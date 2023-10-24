import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { guardarInformacion } from "../../redux/actions";

import style from './success.module.css'
import check from '../../assets/check.png'

export default function Success(){
    const informacion = useSelector(state => state.informacion);

    const navigate = useNavigate()

    const handleNewTurno = () => {
        navigate('/');
    }

    return(
        <div className={style.container}>
            <h1 className={style.title}>Turno confirmado!</h1>
            <img className={style.img} src = {check} alt="Check" />
            <div className={style.text}>
            <h2>Te esperamos el: {informacion.turnos.fecha}</h2>
            <h2>para: {informacion.turnos.servicios}</h2>
            <h2>a las: {informacion.turnos.hora}</h2>
            <h2 className={style.subtitle}> San Martin 1997</h2>
            </div>
        <div>
            <button className="button" onClick={handleNewTurno}>Solicitar otro turno</button>
        </div>
        </div>
    )
};