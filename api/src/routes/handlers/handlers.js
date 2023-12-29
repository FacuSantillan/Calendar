const getAllReservas = require('../../controllers/Gets/getAllFromDB');
const deleteTurno = require('../../controllers/Delete/deleteTurno');
const deleteClient = require('../../controllers/Delete/deleteClient');
const putTurno = require('../../controllers/Puts/putTurno');
const getAllHorarios = require('../../controllers/Gets/getHorarios');

const { transporter } = require("../../nodeMailer/mailerController")
const { createClient } = require('../../controllers/Posts/postClient');
const { getClientByName } = require('../../controllers/Gets/getByName');
const { getClientByDate } = require('../../controllers/Gets/getByDate');
const { createAdmin } = require('../../controllers/Posts/postHorarios');
const { updateAdmin } = require('../../controllers/Puts/putHorarios');


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

               await transporter.sendMail({
                    from: '"Exclusiva Turnos" <Exclusiva.turnos@gmail.com>', // sender address
                    to: "matiassantillan67@hotmail.com", // list of receivers
                    subject: "¡Nuevo turno reservado!", // Subject line
                    html: `
                    <!DOCTYPE html>
                    <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <title>Confirmación de reserva</title>
                        <style>
                            body {
                                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                                background-color: #f5f5f5;
                                margin: 0;
                                padding: 0;
                            }
                            .container {
                                width: 80%;
                                margin: 20px auto;
                                background-color: #ffffff;
                                padding: 30px;
                                border-radius: 8px;
                                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                            }
                            h2 {
                                color: #4e86e4;
                                margin-bottom: 30px;
                            }
                            p {
                                margin-bottom: 20px;
                                color: #333333;
                                font-size: 18px;
                            }
                            ul {
                                list-style: none;
                                padding: 0;
                                text-align: left;
                            }
                            li {
                                margin-bottom: 15px;
                                color: #555555;
                            }
                            strong {
                                font-weight: bold;
                                color: #4e86e4;
                            }
                            .info {
                                background-color: #f9f9f9;
                                padding: 15px;
                                border-radius: 6px;
                            }
                            .highlight {
                                color: #fffffff;
                                font-weight: bold;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h2>¡Hola Matias!</h2>
                            <div class="info">
                                <p>A continuación se detallan los datos de la reserva:</p>
                                <ul>
                                    <li><strong>Nombre:</strong> <span class="highlight">${nombre} ${apellido}</span></li>
                                    <li><strong>Fecha:</strong> <span class="highlight">${fecha}</span></li>
                                    <li><strong>Hora:</strong> <span class="highlight">${hora}</span></li>
                                    <li><strong>Servicio:</strong> <span class="highlight">${newServicio}</span></li>
                                    <li><strong>Teléfono:</strong> <span class="highlight">${telefono}</span></li>
                                </ul>
                            </div>
                        </div>
                    </body>
                    </html>
                `
                  });

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
