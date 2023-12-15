const { Turnos } = require('../../db')

const putProfesional = async (req, res) => {
const newData = req.body; 
const { id } = req.params;

        const turno = await Turnos.findOne({ where: { id: id } });
        if (!turno) {
            res.status(404).json({ error: 'Turno no encontrado.' });
        }
        await turno.update(newData);
        return turno
};

module.exports = putProfesional;
