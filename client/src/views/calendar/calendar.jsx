import { useState, useEffect } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { guardarInformacion } from "../../redux/actions"
import { useNavigate } from 'react-router-dom';

import Calendar from 'react-calendar';
import dayjs from "dayjs"; 
import style from './calendar.module.css'

function Calendario({guardarInformacion}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const allReservas = useSelector((state) => state.Reservas);
    const informacion = useSelector(state => state.informacion);
    
    const [horas, setHoras] = useState ([]);
    const [selectedDay, setSelectedDay] = useState('');
    const [isFormComplete, setIsFormComplete] = useState(false);

    const [clientData, setClientData] = useState({
        nombre: informacion.nombre,
        apellido: informacion.apellido,
        telefono: informacion.telefono,
        turnos:{
            hora:"",
            fecha:"",
            servicios:[informacion.turnos.servicios]
        }
    });

    const [dateValue, setDateValue] = useState(new Date());
    const formatDate = (date) => {
        return dayjs(date).format("DD/MM/YYYY");
        };

    const data = [dateValue]

    const isSunday = (date) => {
        return date.getDay() === 0; 
    };
    
    const handleDateChange = (date) => {
        const selectedDate = new Date(date);
        const dayOfWeek = selectedDate.getDay();

    switch (dayOfWeek) {
        case 0:
            setSelectedDay("Domingo");
            break;
        case 1:
            setSelectedDay("Lunes");
            break;
        case 2:
            setSelectedDay("Martes");
            break;
        case 3:
            setSelectedDay("Miércoles");
            break;
        case 4:
            setSelectedDay("Jueves");
            break;
        case 5:
            setSelectedDay("Viernes");
            break;
        case 6:
            setSelectedDay("Sábado");
            break;
        default:
            console.log("Error: Día no válido");
            break;
    }
        handleFilterHours();
        setDateValue(date);

    };

    const loadHorarios = () => {
        if (selectedDay === 'Lunes') {
            const uniqueHoras = new Set(["17hs", "18hs", "19hs", "20hs"]);
            setHoras(Array.from(uniqueHoras));
        } else if (selectedDay === 'Martes' || selectedDay === 'Miércoles' || selectedDay === 'Jueves' || selectedDay === 'Viernes' || selectedDay === 'Sabado') {
            const uniqueHoras = new Set(["09hs", "10hs", "11hs", "12hs", "14hs", "15hs", "16hs", "17hs", "18hs", "19hs", "20hs"]);
            setHoras(Array.from(uniqueHoras));
        }
    };

    const handleFilterHours = (date) => {
        loadHorarios();
    
        const reservationsByHour = {};
    
        if (allReservas.length) {
            for (var i = 0; i < allReservas.length; i++) {
                var date = allReservas[i].turnos[0].fecha;
                var hour = allReservas[i].turnos[0].hora;
    
                if (date === formatDate(dateValue)) {
                    if (reservationsByHour[hour]) {
                        reservationsByHour[hour]++;
                    } else {
                        reservationsByHour[hour] = 1;
                    }
                }
            }
    
            for (const [hour, reservations] of Object.entries(reservationsByHour)) {
                if (reservations >= 4) {
                    setHoras(prevHoras => prevHoras.filter(hora => hora !== hour));
                }
            }
        }
    };

        useEffect(() => {
            handleFilterHours();
        }, [dateValue]);


        const exportData = (event) => {
            const fecha = formatDate(dateValue);
            const value = event.target.value;

            const formComplete = Object.values(clientData).every(value => value !== '');
            setIsFormComplete(formComplete); 

            setClientData(prevClientData => {
                return {
                    ...prevClientData,
                    turnos: {
                        ...prevClientData.turnos,
                        fecha: fecha,
                        hora: value
                    }
                } 
            });
        };

    const handleSubmit = (event) => {
        guardarInformacion(clientData);
        navigate('/confirmation');
        };
  
      const services = (event) => {
        guardarInformacion(clientData);
          navigate('/services')
      };

    return (
        <div className={style.app}>
        <h1 className={style.textCenter}>Seleccione el dia y la hora para su turno:</h1>
        <div className={style.calendarContainer}>
            <Calendar
                minDate={new Date()}
                selectRange={false}
                tileDisabled={({ date }) => {
                    return (date.getDay() === 0) && 
                           (date.getDate() === 5 && date.getMonth() === 10 && date.getFullYear() === 2023);
                }}
                onChange={handleDateChange} 
                value={dateValue} />
        </div>
        <p>Fecha seleccionada: {formatDate(dateValue)}</p>
        <div>
            <h3>Horarios disponibles:</h3>
            {horas.map((item, index) => (
                <>
                    <button className={style.button2}  name="hora" value={item} onClick={exportData} key={index}>{item} </button>
                </>
            ))}
            <p>Hora seleccionada: {clientData.turnos.hora}</p>
        </div>
        <button className={style.button} onClick={handleSubmit} type="submit" disabled={!isFormComplete}>Siguiente</button>
        <button className={style.button} onClick={services} type="submit">Atras</button>
    </div>
);
}
export default connect(null, { guardarInformacion })(Calendario);