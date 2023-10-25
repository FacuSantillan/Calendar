
import Logo from '../../assets/logoIg.png'
import style from './instagram.module.css'

export default function Instagram () {
    
    return(
        <div>
            <a href='https://www.instagram.com/exclusiva_salon_de_autores/'><img className={style.logo} src={Logo}/></a>
        </div>
    )
}; 
