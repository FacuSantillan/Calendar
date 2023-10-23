const { Router } = require('express');

const { postClient, getReservas } = require('./handlers/handlers');


const router = Router();

//Routes:
router.post('/postClient', postClient); 
router.get('/reservas', getReservas)



//  router.post('/postTurno', postTurno ); 

module.exports = router;
