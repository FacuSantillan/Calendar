const { Turnos } = require('../../db');

const createTurno = async (turnoData) => {
    const { fecha, hora, servicio } = turnoData;

    const newTurno = await Turnos.create({
        fecha,
        hora,
        servicio,
    });

    const result = await Turnos.findOne({
        where: {
            id: newTurno.id,
        },
        attributes: ['id', 'fecha', 'hora', 'servicio'],
    });

    return result;
};

module.exports = {
    createTurno,
};