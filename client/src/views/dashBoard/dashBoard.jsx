import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { guardarInformacion, getReservas } from "../../redux/actions";
import { useEffect } from 'react';

import Cards from '../../components/cards/cards';
import style from './dashBoard.module.css';

function DashBoard ({guardarInformacion}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allReservas = useSelector((state) => state.Reservas);
    const informacion = useSelector(state => state.informacion);

    const [clientData, setClientData] = useState({
        nombre: informacion.nombre,
        apellido: informacion.apellido,
        telefono: informacion.telefono,
});

const getAllReservas = () => {
    dispatch(getReservas())
};

const validation = () => {
    if (clientData.nombre != 'admin' && clientData.apellido != 'admin' && clientData.telefono != '203320'){ 
        navigate('/')
    } else{ getAllReservas() }
};

useEffect(() => {
    validation()
}, []);

    return(
        <div>
            <h1>Turnos:</h1>
            <Cards key={Cards} allReservas={allReservas}/>
        </div>
    )
};


export default connect(null, { guardarInformacion })(DashBoard);