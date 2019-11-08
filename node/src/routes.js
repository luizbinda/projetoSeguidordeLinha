import { Router } from 'express';

import authMiddleware from './app/middlewares/authConfig';
import UserController from './app/Controllers/UsuarioController';
import CarController from './app/Controllers/CarrinhoController';
import LoginController from './app/Controllers/LoginController';
import CarUserController from './app/Controllers/CarrinhoUsuarioController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/cars', CarController.store);
routes.post('/login', LoginController.store);

routes.use(authMiddleware);

routes.post('/car_user', CarUserController.store);

routes.put('/users', UserController.update);
export default routes;
