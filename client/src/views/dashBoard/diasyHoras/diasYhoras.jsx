import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHorarios, addHorarios } from '../../../redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import style from './diasyhoras.module.css';
import 'react-toastify/dist/ReactToastify.css';
function DiasYHoras() {
  const Horarios = useSelector((state) => state.horarios);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHorarios());
  }, [dispatch]);

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState(Horarios[0] || {}); // Inicializa con un objeto vacío si Horarios[0] es undefined

  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const handleDayChange = (e) => {
    const day = e.target.value;
    setSelectedDay(day);
    setSelectedTime(null);

    if (selectedTimes && selectedTimes[day]) {
      setSelectedTime(selectedTimes[day][0]);
    }
  };

  const handleSubmit = () => {
    dispatch(addHorarios(selectedTimes));
    toast.success("¡Horarios cargados con exito!",{
      position: toast.POSITION.BOTTOM_RIGHT,
    })
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setSelectedTimes({
      ...selectedTimes,
      [selectedDay]: [...(selectedTimes[selectedDay] || []), time],
    });
  };

  const handleDeleteTime = (day, index) => {
    const updatedTimes = selectedTimes[day].filter((_, i) => i !== index);
    setSelectedTimes({
      ...selectedTimes,
      [day]: updatedTimes,
    });
  };

  useEffect(() => {
    // Muestra los horarios seleccionados al cambiar de día
    if (selectedDay && selectedTimes[selectedDay]) {
      setSelectedTime(selectedTimes[selectedDay][0]); // Establecer el primer horario como seleccionado
    }
  }, [selectedDay, selectedTimes]);

  return (
    
    <div className={style.container}>
      <ToastContainer/>
      <h1 className={style.title}>Días y Horas</h1>
      <select className={style['select-day']} onChange={handleDayChange} value={selectedDay || ''}>
        <option value="">Selecciona un día</option>
        {daysOfWeek.map((day, index) => (
          <option key={index} value={day}>
            {day}
          </option>
        ))}
      </select>

      {selectedDay && (
        <div>
          <h2>Horarios para {selectedDay}</h2>
          <div className={style['time-buttons']}>
            {Array.from({ length: 48 }, (_, index) => {
              const hour = Math.floor(index / 2);
              const minute = index % 2 === 0 ? '00hs' : '30hs';
              const time = `${hour.toString().padStart(2, '0')}:${minute}`;
              return (
                <button key={index} onClick={() => handleTimeSelection(time)}>
                  {time}
                </button>
              );
            })}
          </div>
          {selectedTimes[selectedDay] && selectedTimes[selectedDay].length > 0 && (
            <div>
              <h3>Horarios seleccionados para {selectedDay}:</h3>
              <ul className={style['selected-times-list']}>
                {selectedTimes[selectedDay].map((time, index) => (
                  <li key={index} className={style['selected-time']}>
                    {time}
                    <button onClick={() => handleDeleteTime(selectedDay, index)}>Eliminar</button>
                  </li>
                ))}
              </ul>
              <button className={style.button} onClick={handleSubmit}>
                Confirmar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DiasYHoras;
