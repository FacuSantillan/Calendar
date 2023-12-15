const getAllReservas = require('./getAllFromDB')

const getClientByDate = async(req) => {
    try {
        const date = req.query.date;
        const response = await getAllReservas();
        
        // Si no existe el nombre, retornar todas las recetas
        if (!date) {
            return response;
        }

        // Realizar el filtrado de recetas que coinciden con el nombre buscado (insensible a mayúsculas/minúsculas)
        let filter = response.filter((resp) =>
            resp.turnos[0].fecha.toLowerCase().includes(date.toLowerCase())
        );

        // Si se encontraron recetas que coinciden, retornarlas, de lo contrario, retornar un mensaje de error
        return filter.length
            ? filter
            : { error: `No hay clientes para esta fecha` };
    } catch (error) {
        // Si ocurre un error durante el proceso, retornar un objeto con un mensaje de error
        return { error: error.message };
    }
};

module.exports = {
    getClientByDate,
};