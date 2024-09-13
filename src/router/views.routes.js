import express from 'express';

const ViewsRouter = express.Router();



ViewsRouter.get('/inicio', async (req, res) => {
    res.render("inicio", { title: "Inicio" });
});

ViewsRouter.get('/messageSend', (req, res) => {
    res.render('messageSend', { mensaje: "Listo! Tu mensaje se envió correctamente, gracias por escribirme :)" });
});
ViewsRouter.get('/', async (req, res) => {
    res.send("Hola mundo");
});



export default ViewsRouter;