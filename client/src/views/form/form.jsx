import { guardarInformacion } from "../../redux/actions"
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

import logo from '../../assets/logopel.png'

import './form.css'

const Form = ({ guardarInformacion }) => {
    const navigate = useNavigate();
    localStorage.clear();
    
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [clientData, setClientData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    turnos:{
        servicios:[]
    }
});

const adminView = (e) => {
  if(clientData.nombre === 'admin' && clientData.apellido === 'admin' && clientData.telefono === '123123123'){
    guardarInformacion(clientData);
    const telefono = clientData.telefono;
    localStorage.setItem('telefonoUsuario', telefono);
    navigate('/admin');
  } else {
    e.preventDefault();
    guardarInformacion(clientData);
    navigate('/services');
  } 
};

const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setClientData({ ...clientData, [property]: value });

    if(clientData.telefono.length > 6){
      const formComplete = Object.values(clientData).every(value => value !== '');
      setIsFormComplete(formComplete);
    }else{setIsFormComplete('')}
};


    return(
        <div className="form-container">
           <img className='logo' src={logo} alt='logo'/>

        <div className="form-group">
          <h3>Nombre</h3>
          <input
            className="form-control"
            onChange={handleChange}
            value={clientData.nombre}
            type="text"
            name="nombre"
            id="nombre"
            autoComplete="name"
          />
        </div>
        <div className="form-group">
          <h3>Apellido</h3>
          <input
            className="form-control"
            onChange={handleChange}
            value={clientData.apellido}
            type="text"
            name="apellido"
            id="apellido"
            autoComplete="apellido"
          />
        </div>
        <div className="form-group">
          <h3>Teléfono</h3>
          <input
            className="form-control"
            onChange={handleChange}
            value={clientData.telefono}
            type="tel"
            id="telefono"
            name="telefono"
            autoComplete="telefono"
            placeholder="3865123123"
          />
        <button className="button"
                onClick={adminView}
                type="submit"
                disabled={!isFormComplete}>
          Siguiente
        </button>
        </div>
        <div>
        </div>
      </div>
    

    )
};

export default connect(null, { guardarInformacion })(Form);