const { Clients, Turnos, Reserva} = require('../../db');
const { createTurno } = require('./postTurno')

const { Op } = require("sequelize");


const createClient = async (clientData) => {
    const { nombre, apellido, telefono, hora, fecha, servicio} = clientData;
    
    const turnoData = {
        fecha,
        hora,
        servicio,
    };
    const newTurno = await createTurno(turnoData);

    const newClient = await Clients.create({
        id:newTurno.id,
        nombre,
        apellido,
        telefono,
    });

     const Relations = await Reserva.create({
        ClientId:newClient.id,
        TurnoId:newTurno.id,
     })
     
const result = await Clients.findOne({
    where: {
        id: newClient.id, 
    },
    attributes: ['id', 'nombre', 'apellido', 'telefono'],
    include: [{ model: Turnos }],
});
 
    return result;
};


module.exports = {
    createClient,
}
