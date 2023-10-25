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
      
      <div >

      <div className={style.container}>
      <h1 className={style.h1}>Selecciona el servicio que desea</h1>
      <select value={clientData.turnos.servicios[i]} onChange={handleSelectChange} className={style.select}>

        <option value="defaultValue" selected>Peluqueria</option>
        <option value="Corte masculino">Corte masculino</option>
        <option value="Corte Femenino">Corte femenino</option>
        <option value="Mechas">Mechas</option>
        <option value="Iluminacion">Iluminacion</option>
        <option value="Color L'Oréal">Color L'Oréal</option>
        <option value="Color INOA">Color INOA</option>
        <option value="Plancha">Plancha</option>
        <option value="Brushing">Brushing</option>
        <option value="Nutricion">Nutricion</option>
        <option value="Nutricion L'Oréal">Brushing</option>
        <option value="Diagnosticos">Diagnosticos</option>
        <option value="Retoque de color">Retoque de color</option>

      </select>
      <select value={clientData.turnos.servicios[i]} onChange={handleSelectChange} className={style.select}>

        <option value="defaultValue" selected>Uñas</option>
        <option value="soft gel">soft gel</option>
        <option value="Kapping gel">Kapping gel</option>
        <option value="Lifting de pestañas">Lifting de pestañas</option>
        <option value="Belleza de pies">Belleza de pies</option>
        
      </select>
      <button onClick={handleAddItem} className={style.button1}>Agregar</button>

<div>
<ul className={style.ul}>
        {data.map((item, index) => (
          <li className={style.li} key={index}>
            {item} <button className={`${style.boton}`} value={item} onClick={() => deleteItem(item)}> X </button>
          </li>
        ))}
      </ul>
</div>
      
        <div className={style.buttons}>
      <button disabled={!isFormComplete} onClick={handleSubmit} type="submit" className={style.button}>Siguiente</button>
      <button onClick={otherService} type="submit" className={style.button}>Servicio personalizado</button>
        </div>
</div>

    </div>

    )
};

export default connect(null, { guardarInformacion })(Services);
