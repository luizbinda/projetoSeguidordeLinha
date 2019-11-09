import { Router } from 'express';

import authMiddleware from './app/middlewares/authConfig';
import UserController from './app/Controllers/UsuarioController';
import CarController from './app/Controllers/CarrinhoController';
import LoginController from './app/Controllers/LoginController';
import CarUserController from './app/Controllers/CarrinhoUsuarioController';
import TrackController from './app/Controllers/PistaController';
import SectorController from './app/Controllers/SetorController';
import CalibrationCarController from './app/Controllers/CalibracaoCarrinhoController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/cars', CarController.store);
routes.post('/login', LoginController.store);
routes.post('/tracks', TrackController.store);
routes.post('/sectors', SectorController.store);
routes.post('/calibration', CalibrationCarController.store);

routes.use(authMiddleware);

routes.post('/car_user', CarUserController.store);

routes.put('/users', UserController.update);
export default routes;
