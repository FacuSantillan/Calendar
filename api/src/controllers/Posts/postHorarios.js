const { Admin } = require('../../db');

const createAdmin = async (adminData) => {
    try {
        const { Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo } = adminData;

        const newAdmin = await Admin.create({
            Lunes,
            Martes,
            Miércoles,
            Jueves,
            Viernes,
            Sábado,
            Domingo,
        });

        const result = await Admin.findOne({
            where: {
                id: newAdmin.id,
            },
            attributes: ['id', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        });

        return result;
    } catch (error) {
        throw new Error('Error al crear el horario del administrador');
    }
};

module.exports = {
    createAdmin,
};
