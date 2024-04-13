import express from 'express';
import { engine } from "express-handlebars"
import * as path from "path";
import __dirname from "./utils.js";
import dotenv from 'dotenv';
import mailer from './public/js/nodemailer.js';

const { sendMail } = mailer;

// Variables de entorno
dotenv.config();

//Rutas
import ViewsRouter from './router/views.routes.js';

//Creación de la aplicación Express y servidor HTTP:
const app = express();
const PORT = process.env.PORT || 8080;

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Estructura handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//Configuración de rutas estáticas y de vistas:
app.use("/", express.static(__dirname + "/public"))

//Ruta para vistas
app.use('/', ViewsRouter);

//Rutas estáticas
app.use("/public/css", express.static(__dirname + "/public/css"));
app.use("/public/img", express.static(__dirname + "/public/img"));
app.use("/public/js", express.static(__dirname + "/public/js"));


//Configuración de formulario

app.post('/enviar-correo', async (req, res) => {
    try {

        const emailOptions = {
            from: req.body.email,
            to: process.env.USERMAILER,
            subject: req.body.asunto,
            text: req.body.mensaje
        };
        await sendMail(emailOptions);
        console.log("Correo enviado correctamente");
        res.render('messageSend', { mensaje: 'Listo, tu correo fue enviado, gracias por escribirme!' });

    } catch (error) {
        console.log("Error al enviar el correo");
        res.status(500).send("Error al enviar el correo");
    }

});

//Servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});






