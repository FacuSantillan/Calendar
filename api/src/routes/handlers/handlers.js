const { createClient } = require('../../controllers/Posts/postClient');
const getAllReservas = require('../../controllers/Gets/getAllFromDB')

//-------------------Crear clientes y turnos------------------------------//

const postClient = async (req, res) => {
    try {
        const { nombre, apellido, telefono, turnos } = req.body;
        const { hora, fecha, servicios } = req.body.turnos;
        const servicio = JSON.stringify(servicios);

        console.log(req.body.turnos)
        if (!(nombre && apellido && telefono && turnos)) {
            return res.status(400).send('Faltan datos');
        };
  
        const clientData = {
            nombre,
            apellido,
            telefono,
            hora,
            fecha,
            servicio
        };

        const newClient = await createClient(clientData);
        res.status(200).json(newClient);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//-------------------obtener Reservas------------------------------//

const getReservas = async(req, res) => {
    try {
        const response = await getAllReservas();

        if(response.length){
            res.status(200).json(response); // Si hay reservas, se envía la respuesta 200
        } else {
            res.status(400).json('No hay reservas momentaneamente.'); // Si no hay reservas, se envía la respuesta 400
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

module.exports ={
    postClient,
    getReservas
} 