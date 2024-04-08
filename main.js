import express from 'express';
import dotenv from 'dotenv';
import mailer from './assets/js/nodemailer.js';
import path from 'path';
import { fileURLToPath } from 'url';

const { sendMail } = mailer;
dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Servidor Express funcionando correctamente');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Configuración de rutas estáticas y de vistas:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/", express.static(__dirname + "/assets"))

app.post('/enviar-correo', async (req, res) => {
    console.log("Entre en el enviar correo");
    try {
        console.log(req.body); // Verificar que se estén recibiendo los datos
        console.log(req.body.email);

        const emailOptions = {
            from: req.body.email,
            to: process.env.USERMAILER,
            subject: req.body.asunto,
            text: req.body.mensaje
        };
        await sendMail(emailOptions);
        console.log("Correo enviado correctamente");

    } catch (error) {
        console.log("Error al enviar el correo");
        res.status(500).send("Error al enviar el correo");
    }

});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});



