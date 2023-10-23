import style from './services.module.css'
import { guardarInformacion, getReservas } from "../../redux/actions"
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';


const Services = ({guardarInformacion}) => {

    const informacion = useSelector(state => state.informacion);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectedItems, setSelectedItems] = useState([]);
    const [isFormComplete, setIsFormComplete] = useState(false);

    const [clientData, setClientData] = useState({
      nombre: informacion.nombre,
      apellido: informacion.apellido,
      telefono: informacion.telefono,
      turnos:{
        servicios:[]
      }
    });

  useEffect(() => {
    dispatch(getReservas())
  }, []);

    let data = clientData.turnos.servicios
    let i = data.length

    const handleSubmit = (event) => {
      guardarInformacion(clientData);
        navigate('/calendar');
      };

    const otherService = (event) => {
      guardarInformacion(clientData);
        navigate('/otherservices')
    };

    const handleSelectChange = (e) => {
      const selectedService = e.target.value;
      const data = clientData.turnos.servicios
      data.push(selectedService)

      const formComplete = Object.values(clientData).every(value => value !== '');
      setIsFormComplete(formComplete);
  };

    const handleAddItem = () => {
      setSelectedItems([...data]);
  };
  
  const deleteItem = (value) => {
    let res = data.filter(item => item !== value);
    setClientData(prevState => ({
      ...prevState,
      turnos: {
        ...prevState.turnos,
        servicios: res
      }
    }));
  };

    return(

      <div className={style.container}>
      <h1>Selecciona el servicio que desea</h1>
      <select value={clientData.turnos.servicios[i]} onChange={handleSelectChange} className={style.select}>
        <option value="defaultValue" selected>Peluqueria</option>
        <option value="Corte masculino">Corte masculino</option>
        <option value="Corte Femenino">Corte Femenino</option>
        <option value="Color">Color</option>
        <option value="Mechas">Mechas</option>
      </select>
      <select value={clientData.turnos.servicios[i]} onChange={handleSelectChange} className={style.select}>
        <option value="defaultValue" selected>Uñas</option>
        <option value="Permanentes">Permanentes</option>
        <option value="Manicura completa">Manicura completa</option>
        <option value="Pedicura completa">Pedicura completa</option>
      </select>
      <button onClick={handleAddItem} className={style.button1}>Agregar</button>

      <ul className={style.ul}>
        {data.map((item, index) => (
          <li className={style.li} key={index}>
            {item} <button className={`${style.boton}`} value={item} onClick={() => deleteItem(item)}> X </button>
          </li>
        ))}
      </ul>
        
      <button disabled={!isFormComplete} onClick={handleSubmit} type="submit" className={style.button}>Siguiente</button>
      <button onClick={otherService} type="submit" className={style.button}>Servicio personalizado</button>
    </div>

    )
};

export default connect(null, { guardarInformacion })(Services);
