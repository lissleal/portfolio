import express from 'express';

const ViewsRouter = express.Router();

ViewsRouter.get('/inicio', async (req, res) => {
    res.render("inicio", { title: "Inicio" });
});

ViewsRouter.get('/messageSend', (req, res) => {
    res.render('messageSend', { mensaje: "Listo! Tu mensaje se envió correctamente, gracias por escribirme :)" });
});



export default ViewsRouter;