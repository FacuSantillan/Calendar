import './App.css'
import { Route, Routes, useLocation} from 'react-router-dom';

import Form from './views/form/form';
import Success from './views/success/success';
import Calendario from './views/calendar/calendar';
import Services from './views/services/services';
import Confirmation from './views/confirmation/confirmation';
import OtherServices from './views/otherServices/otherServices';
import DashBoard from './views/dashBoard/dashBoard';
import Menu from './components/Menu/menu';
import DiasYHoras from './views/dashBoard/diasyHoras/diasYhoras';

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001/'
// axios.defaults.baseURL = 'https://calendar-production.up.railway.app'

function App() {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname === "/admin" && <Menu/>}
      {pathname === "/admin/diasyhoras" && <Menu/>}
      <Routes>
    
        <Route path='/' element={<Form/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/otherservices' element={<OtherServices/>}/>
        <Route path='/calendar' element={<Calendario/>}/>
        <Route path='/confirmation' element={<Confirmation/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/admin' element={<DashBoard/>}/>
        <Route path='/admin/diasyhoras' element={<DiasYHoras/>}/>
      </Routes>
    </div>
  )
}

export default App
