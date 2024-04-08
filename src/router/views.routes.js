import express from 'express';

const ViewsRouter = express.Router();

ViewsRouter.get('/inicio', async (req, res) => {
    res.render("inicio", { title: "Inicio" });
});

export default ViewsRouter;