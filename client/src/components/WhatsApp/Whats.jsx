
import Logo from '../../assets/Logo.png'
import style from './Whats.module.css'

export default function WhatsApp () {
    
    return(
        <div>
            <a href='https://wa.me/543513410820?text=Hola!%20quiero%20realizar%20una%20consulta'><img className={style.logo} src={Logo}/></a>
        </div>
    )
}; 
