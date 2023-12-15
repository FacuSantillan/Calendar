import { useSelector } from 'react-redux';
import Card from "../card/card";
import style from './cards.module.css'

export default function Cards(props) {
    const allReservas = useSelector((state) => state.Reservas);
    
    if (!Array.isArray(allReservas)) {
        return <div className={style.error}>No hay reservas momentaneamente.</div>; // Puedes personalizar el mensaje según tu necesidad
    }

    return (
        <div className='page'>
            <div className="cont">
                {allReservas.map((data) => {
                    return (
                        <Card
                            nombre={data.nombre}
                            apellido={data.apellido}
                            telefono={data.telefono}
                            fecha={data.turnos[0].fecha}
                            hora={data.turnos[0].hora}
                            servicio={data.turnos[0].servicio}
                            key={data.id}
                        />
                    );
                })}
            </div>
        </div>
    );
}