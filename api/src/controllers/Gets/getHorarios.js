const { Admin } = require('../../db');

const getAllHorarios = async () => {
        const response = await Admin.findAll({
            attributes: [
                'Lunes', 
                'Martes', 
                'Miércoles', 
                'Jueves', 
                'Viernes', 
                'Sábado', 
                'Domingo'
            ],
            order: [['createdAt', 'DESC']],
        });

        return response.map((res) => {
            return {
            Lunes: res.dataValues.Lunes,
            Martes: res.dataValues.Martes,
            Miércoles: res.dataValues.Miércoles,
            Jueves: res.dataValues.Jueves,
            Viernes: res.dataValues.Viernes,
            Sábado: res.dataValues.Sábado,
            Domingo: res.dataValues.Domingo
            }})
};

module.exports = getAllHorarios;
