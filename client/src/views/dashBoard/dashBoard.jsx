import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { guardarInformacion, getReservas, getByDate, clearFilters, getHorarios } from "../../redux/actions";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import dayjs from "dayjs"; 
import Calendar from 'react-calendar';
import Searchbar from '../../components/searchBar/Searchbar'
import Cards from '../../components/cards/cards';
import style from './dashBoard.module.css';

function DashBoard () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allReservas = useSelector((state) => state.Reservas);

    const [dateValue, setDateValue] = useState(new Date());

    const formatDate = (date) => {
        return dayjs(date).format("DD/MM/YYYY");
        };

useEffect(() => {
    const token = localStorage.getItem('telefonoUsuario');
    if (!token) {
      navigate('/');
    }
  }, []);

const getAllReservas = () => {
    dispatch(getReservas())
};

useEffect(() => {
    getAllReservas()
}, []);

useEffect(() => {
    dispatch(getHorarios());
  }, [dispatch]);

const handleDateChange = (date) => {
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();
    
    setDateValue(date);

    dispatch(getByDate(formatDate(date)));
};

    const clearState = () => {
        dispatch(clearFilters())
    }

    return(
        <div>
            
        <Calendar   className={style.reactCalendar}
                    onChange={handleDateChange} 
                    value={dateValue}
                    minDate={new Date()}
                    selectRange={false}/>

            <ToastContainer/>
            <h1 className={style.title}>Reservas</h1>
            <button className={style.button} onClick={clearState}>Todos los turnos</button>
            <div>
            <Searchbar/>
            </div>
            <div className={style.column}>
                <h4 className={style.column1}>Nombre</h4>
                <h4 className={style.column2}>Telefono</h4>
                <h4 className={style.column3}>Hora</h4>
                <h4 className={style.column4}>Fecha</h4>
                <h4 className={style.column5}>Servicio</h4>
            </div>
            <Cards className={style.card} key={Cards} allReservas={allReservas}/>
        </div>
    )
};


export default connect(null, { guardarInformacion })(DashBoard);