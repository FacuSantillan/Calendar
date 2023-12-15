const { Turnos } = require('../../db');

const createTurno = async (turnoData) => {
    const { fecha, hora, servicio } = turnoData;
    const adminId = "71c9c30a-daa4-460d-b84b-1145bd839345";

    const newTurno = await Turnos.create({
        fecha,
        hora,
        servicio,
        AdminId: adminId,
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
