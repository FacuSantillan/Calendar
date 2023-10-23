import { useNavigate } from 'react-router-dom'

import style from './success.module.css'
import check from '../../assets/check.png'


export default function Success(){
    const navigate = useNavigate()


    const handleNewTurno = () => {
        navigate('/');
    }

    return(
        <div className={style.container}>
            <h1 className={style.title}>Turno confirmado!</h1>
            <img className={style.img} src = {check} alt="Check" />
            <h2 className={style.subtitle}>Te esperamos en:</h2>
            <h2 className={style.subtitle}>San Martin 1997</h2>
        <div>
            <button className="button" onClick={handleNewTurno}>Solicitar otro turno</button>
        </div>
        </div>
    )
};