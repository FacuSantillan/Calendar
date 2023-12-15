const { Clients } = require('../../db');

const deleteClient = async (req, res) => {
    const { id } = req.params;

        const clients = await Clients.findOne({
            where: {
                id: id
            }
        });
        
        if (!turno) {
            return res.status(404).json({ message: 'Cliente no encontrado.' });
        }

    await clients.destroy();
};

module.exports = deleteClient

