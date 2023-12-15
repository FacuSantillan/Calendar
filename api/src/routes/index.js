const { Router } = require('express');

const { postClient, getReservas, deleteClients, deleteTurnos, updateTurno, filterByName, filterByDate, postHorarios, putHorarios, getHorarios } = require('./handlers/handlers');


const router = Router();

//Routes:
router.post('/postClient', postClient); 
router.post('/posthorario', postHorarios)

router.get('/reservas', getReservas);
router.get('/getName', filterByName);
router.get('/getDate', filterByDate)
router.get('/gethorarios', getHorarios)

router.delete('/deleteClient', deleteClients);
router.delete('/deleteTurno', deleteTurnos);

router.put('/updateTurno', updateTurno);
router.put('/updateHorario', putHorarios)

//  router.post('/postTurno', postTurno ); 

module.exports = router;
