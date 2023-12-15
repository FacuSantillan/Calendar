const { Clients, Turnos } = require('../../db')

const getAllReservas = async() => {
        const response = await Clients.findAll({
            attributes: [
                'id',
                'nombre',
                'apellido',
                'telefono',
                'createdAt'
            ],
            include: { model: Turnos },
            order: [['createdAt', 'DESC']],
        });

        return response.map((res) => {
            return {
                id: res.dataValues.id,
                nombre: res.dataValues.nombre,
                apellido: res.dataValues.apellido,
                telefono: res.dataValues.telefono,
                creacion: res.dataValues.createdAt,
                turnos: res.dataValues.Turnos.map((turno) => {
                    return {
                        hora: turno.hora,
                        fecha: turno.fecha,
                        servicio: turno.servicio,
                    };
                }),
            };
        });
    };

module.exports = getAllReservas;
