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
    const [horas, setHoras] = useState ([]);

    const allReservas = useSelector((state) => state.Reservas);
    const informacion = useSelector(state => state.informacion);
    
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
        handleFilterHours()
        setDateValue(date);
    };
    
    const loadHorarios = () => {

        if (horas.length < 4) {
            const uniqueHoras = new Set(horas);

            uniqueHoras.add("17hs");
            uniqueHoras.add("18hs");
            uniqueHoras.add("19hs");
            uniqueHoras.add("20hs");
    
            const newHoras = Array.from(uniqueHoras);
    
            setHoras(newHoras);
        }};

        const handleFilterHours = (date) => {
            loadHorarios();

            var container = [];
            var container1 = [];
            var container2 = [];
            var container3 = [];

            if (allReservas.length) {
                for (var i = 0; i < allReservas.length; i++) {
                    var date = allReservas[i].turnos[0].fecha;
                    var hour = allReservas[i].turnos[0].hora;
        
                    if (hour === "17hs" && date === formatDate(dateValue)) {
                        container.push(hour);
                    } else if (hour === "18hs" && date === formatDate(dateValue)) {
                        container1.push(hour);
                    } else if (hour === "19hs" && date === formatDate(dateValue)) {
                        container2.push(hour);
                    } else if (hour === "20hs" && date === formatDate(dateValue)) {
                        container3.push(hour);
                    }
                }
        
                if (container.length === 4) {
                    const res = setHoras(horas.filter(hora => hora !== "17hs"));
       
                }else  if (container1.length === 4) {
                    const res = setHoras(horas.filter(hora => hora !== "18hs"));

                }else  if (container2.length === 4) {
                    const res = setHoras(horas.filter(hora => hora !== "19hs"));
          
                } else  if (container3.length === 4) {
                    const res = setHoras(horas.filter(hora => hora !== "20hs"));
            
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
                tileDisabled={({ date }) => isSunday(date)}
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