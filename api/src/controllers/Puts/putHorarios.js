const { Admin } = require('../../db'); // Asegúrate de la ruta correcta si es diferente

const updateAdmin = async (adminId, updatedSchedule) => {
    try {
        const admin = await Admin.findByPk(adminId);

        if (!admin) {
            throw new Error('Admin no encontrado');
        }

        await admin.update(updatedSchedule);

        const updatedAdmin = await Admin.findByPk(adminId, {
            attributes: ['id', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        });

        return updatedAdmin;
    } catch (error) {
        throw new Error('Error al actualizar el horario del administrador');
    }
};

module.exports = {
    updateAdmin,
};
