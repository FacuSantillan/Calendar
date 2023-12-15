const { Turnos } = require('../../db');

const createTurno = async (turnoData) => {
    const { fecha, hora, servicio } = turnoData;
    const adminId = "12ebefa1-6e92-41ea-9ca7-e1a16c215452";

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
