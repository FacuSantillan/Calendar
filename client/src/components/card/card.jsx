import persona from '../../assets/persona.png';
import style from './card.module.css';

export default function Card(props) {
    const { nombre, apellido, telefono, hora, fecha, servicio } = props;

    for (let i = 0; i < servicio.length; i++) {
        const e = servicio[i];
        var texto = JSON.parse(servicio)[0][0];
    }
    const cadenaSeparadaPorComas = texto.join(", ");

    const capitalizarPrimeraLetra = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className={style.contenedor}>
            <img src={persona} alt="img" className={style.imagen} />
            <h3 className={style.nombre}>{capitalizarPrimeraLetra(nombre)} {capitalizarPrimeraLetra(apellido)}</h3>
            <p className={style.telefono}><b></b> {telefono}</p>
            <p className={style.hora}><b></b> {hora}</p>
            <p className={style.fecha}><b></b> {fecha}</p>
            <p className={style.servicio}><b></b> {cadenaSeparadaPorComas}</p>
        </div>
    )
}



