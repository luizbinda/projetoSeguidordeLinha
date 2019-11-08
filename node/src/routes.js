import { Router } from 'express';

import UserController from './app/Controllers/UsuarioController';
import CarController from './app/Controllers/CarrinhoController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/cars', CarController.store);

export default routes;
