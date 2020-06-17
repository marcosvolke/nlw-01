import express, { request } from 'express';
import multer from 'multer';
import multerConfig from './configs/multer';
import { celebrate, Joi } from 'celebrate';

// Import controllers
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

// Pega controle de rotas
const routes = express.Router();

const upload = multer(multerConfig);

// Controllers
const pointsController = new PointsController();
const itemsController = new ItemsController();

// Padrões de nome de métodos: index (listagem), show (buscar um), create ou store, update e delete ou destroy
routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

    // Ficou desatualizado depois do upload de imagem
// routes.post('/points-meujeito', pointsController.createMeuJeito);

// Single se for enviar um arquivo, mais de um seria Array. E o nome do campo - image
routes.post(
    '/points', 
    upload.single('image'), 
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    pointsController.create
);


export default routes;