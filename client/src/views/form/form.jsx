import { guardarInformacion } from "../../redux/actions"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { connect } from 'react-redux';
import './form.css'

const Form = ({ guardarInformacion }) => {
    const navigate = useNavigate();

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
  if(clientData.nombre === 'admin' && clientData.apellido === 'admin' && clientData.telefono === '203320'){
    guardarInformacion(clientData);
    navigate('/admin');
  } else{
    e.preventDefault();
    guardarInformacion(clientData);
    navigate('/services');
  } 
};

const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setClientData({ ...clientData, [property]: value });

    const formComplete = Object.values(clientData).every(value => value !== '');
    setIsFormComplete(formComplete);
};

    return(
        <div className="form-container">
        <div className="form-group">
          <h3>Nombre</h3>
          <input
          placeholder="Abigail"
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
            placeholder="Sanchez"
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
           placeholder="3865-111111"
            className="form-control"
            onChange={handleChange}
            value={clientData.telefono}
            type="tel"
            id="telefono"
            name="telefono"
            autoComplete="telefono"
          />
        </div>
        <div>
        <button className="button"
                onClick={adminView}
                type="submit"
                disabled={!isFormComplete}>
          Siguiente
        </button>
        </div>
      </div>
    

    )
};

export default connect(null, { guardarInformacion })(Form);