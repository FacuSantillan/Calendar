import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import Instagram from '../../components/Instagram/instagram'
import WhatsApp from '../../components/WhatsApp/Whats'
import style from './success.module.css'
import check from '../../assets/check.png'
import pin from '../../assets/map.png'
export default function Success(){
    const informacion = useSelector(state => state.informacion);
    const navigate = useNavigate()

    useEffect(()=>{
        if(informacion.telefono === undefined ||informacion.telefono=== undefined ||informacion.telefono=== undefined){
          navigate('/');
        }
      },[])
      
    const handleNewTurno = () => {
        navigate('/');
    }

    return(
        <div className={style.container}>

        <div className={style.component}>
            <WhatsApp/>
        </div>

        <div className={style.component1}>
            <Instagram/>
            </div>

            <h1 className={style.title}>Turno confirmado!</h1>
            <img className={style.img} src = {check} alt="Check" />
            <div className={style.text}>
            <h2>Te esperamos el: {informacion.turnos.fecha}</h2>
            <h2>para: {informacion.turnos.servicios}</h2>
            <h2>a las: {informacion.turnos.hora}</h2>
            <a href='https://maps.app.goo.gl/qSMFm3SKWJNfkGJBA'><h2  className={style.subtitle}> <img src={pin} alt='pin' className={style.pin}/>San martin 1997 - Concepcion</h2></a>
            </div>
        <div>
            <button className="button" onClick={handleNewTurno}>Solicitar otro turno</button>
        </div>
        </div>
    )
};