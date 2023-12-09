const { Clients, Turnos } = require('../../db')

const getAllReservas = async() => {
        const response = await Clients.findAll({
            attributes: [
                'id',
                'nombre',
                'apellido',
                'telefono',
            ],
            include: { model: Turnos },
        order: [['createdAt', 'DESC']],
        });

        console.log(response)

        return response.map((res) => {
            return {
                id: res.dataValues.id,
                nombre: res.dataValues.nombre,
                apellido: res.dataValues.apellido,
                telefono: res.dataValues.telefono,
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
