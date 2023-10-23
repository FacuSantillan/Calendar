
import { guardarInformacion } from "../../redux/actions"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { connect } from 'react-redux';

import WhatsApp from '../../components/WhatsApp/Whats'
import styles from './OtherServices.module.css'; // Importa el archivo CSS Module


const OtherServices = ({guardarInformacion}) => {
    const navigate = useNavigate();
    const informacion = useSelector(state => state.informacion);

    const [clientData, setClientData] = useState({
        nombre: informacion.nombre,
        apellido: informacion.apellido,
        telefono: informacion.telefono,
        turnos:{
          servicio:[""],
        }
      });

      const data = clientData.turnos

      const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setClientData({ ...data, [property]: value });
        console.log(data)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        guardarInformacion(clientData);
        navigate('/calendar');
      };

      const handleServices = () => {
        navigate('/services');
      };

    return(
      <div className={styles.container}>
        <WhatsApp/>
  <h1 className={styles.header}>Servicio personalizado</h1>
  <input
  placeholder="Detalle el servicio que desea"
    className={styles.inputField}
    onChange={handleChange}
    type="text"
    name="servicio"
    id="servicio"
    autoComplete="servicio"
  />
  <div className={styles.buttonContainer}>
    <button
      className={styles.submitButton}
      onClick={handleServices}
      type="submit"
    >
      Atras
    </button>
    <button
      className={styles.submitButton}
      onClick={handleSubmit}
      type="submit"
    >
      Siguiente
    </button>
  </div>
</div>
    )
};

export default connect(null, { guardarInformacion })(OtherServices);