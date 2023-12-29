const getAllReservas = require('../../controllers/Gets/getAllFromDB');
const deleteTurno = require('../../controllers/Delete/deleteTurno');
const deleteClient = require('../../controllers/Delete/deleteClient');
const putTurno = require('../../controllers/Puts/putTurno');
const getAllHorarios = require('../../controllers/Gets/getHorarios');

const { createClient } = require('../../controllers/Posts/postClient');
const { getClientByName } = require('../../controllers/Gets/getByName');
const { getClientByDate } = require('../../controllers/Gets/getByDate');
const { createAdmin } = require('../../controllers/Posts/postHorarios');
const { updateAdmin } = require('../../controllers/Puts/putHorarios');

const accountSid = 'ACcdf275c615c9416735249ba81184a07d';
const authToken = '0b9fed4498dec2e262a0f2ff5030a4c0';
const client = require('twilio')(accountSid, authToken);

//-------------------Crear clientes y turnos------------------------------//
const postClient = async (req, res) => {
    try {
        const { nombre, apellido, telefono, turnos } = req.body;
        const { hora, fecha, servicios } = req.body.turnos;
        const servicio = JSON.stringify(servicios);

        if (!(nombre && apellido && telefono && turnos)) {
            return res.status(400).send('Faltan datos');
        }

        const clientData = {
            nombre,
            apellido,
            telefono,
            hora,
            fecha,
            servicio
        };

        const newServicio = servicios[0][0][0];

        // Enviar mensajes a través de Twilio
        client.messages
            .create({
                body: `¡Nuevo turno reservado! De: ${nombre} ${apellido}, el: ${fecha}, a las ${hora}, para: ${newServicio}, su número de teléfono es: ${telefono}.`,
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+5493513410820'
            })
            .then(message => console.log(message.sid))
            .catch(error => console.error('Error al enviar el mensaje:', error));

        client.messages
            .create({
                body: `¡Hola ${nombre}, gracias por reservar! Los datos de tu turno son: fecha: ${fecha}, hora: ${hora}, para: ${newServicio}.`,
                from: 'whatsapp:+14155238886',
                to: `whatsapp:+549${telefono}`
            })
            .then(message => console.log(message.sid))
            .catch(error => console.error('Error al enviar el mensaje:', error));

        const newClient = await createClient(clientData);
        res.status(200).json(newClient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error en el servidor' });
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
//------------------------Eliminar turno------------------------//
const deleteTurnos = async(req, res) =>{
    try {
        const turno = await deleteTurno(req);
        res.status(200).json('turno eliminado correctamente.')
    
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//------------------------Eliminar profesional------------------------//
const deleteClients = async(req, res) =>{
    try {
        const client = await deleteClient(req);
        res.status(200).json('cliente eliminado correctamente.')
    
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//------------------------Modificar datos de Turno------------------------//
const updateTurno = async(req, res) =>{
    try {
        const turno = await putTurno(req);
        res.status(200).json(turno)
    
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//------------------------Buscar por nombre------------------------//
const filterByName = async (req, res) => {
    try {
        const response = await getClientByName(req);

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//------------------------Buscar por fecha------------------------//
const filterByDate = async (req, res) => {
    try {
        const response = await getClientByDate(req);

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//-------------------Crear horarios------------------------------//
const postHorarios = async (req, res) => {
    try {
        const { Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo } = req.body;

        const adminData = {
            Lunes,
            Martes,
            Miércoles,
            Jueves,
            Viernes,
            Sábado,
            Domingo,
        };

        const newAdminSchedule = await createAdmin(adminData);
        res.status(201).json(newAdminSchedule);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//-------------------actualizar horarios------------------------------//
const putHorarios = async (req, res) => {
try {
    const adminId = req.params.adminId;
    const updatedSchedule = req.body;

    const updatedAdminSchedule = await updateAdmin(adminId, updatedSchedule);
    res.status(200).json(updatedAdminSchedule);

} catch (error) {
    res.status(500).json({ error: error.message });
};
}
//-------------------actualizar horarios------------------------------//

const getHorarios = async(req, res) => {
    try {
        const response = await getAllHorarios();

        if(response.length){
            res.status(200).json(response); 
        } else {
            res.status(400).json('No hay horarios momentaneamente.'); 
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

module.exports ={
    postClient,
    getReservas,
    deleteTurnos,
    deleteClients,
    updateTurno,
    filterByName,
    filterByDate,
    postHorarios,
    putHorarios,
    getHorarios
} 
