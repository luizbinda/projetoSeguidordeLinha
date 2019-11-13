import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/authConfig';
import UserController from './app/Controllers/UsuarioController';
import CarController from './app/Controllers/CarrinhoController';
import FileController from './app/Controllers/FileController';
import LoginController from './app/Controllers/LoginController';
import LogController from './app/Controllers/LogController';
import CarUserController from './app/Controllers/CarrinhoUsuarioController';
import TrackController from './app/Controllers/PistaController';
import SectorController from './app/Controllers/SetorController';
import CalibrationCarController from './app/Controllers/CalibracaoCarrinhoController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/cars', CarController.store);

routes.post('/login', LoginController.store);
routes.post('/tracks', TrackController.store);
routes.post('/sectors', SectorController.store);
routes.post('/calibration', CalibrationCarController.store);
routes.post('/files', upload.single('file'), FileController.store);

routes.use(authMiddleware);

routes.post('/car_user', CarUserController.store);
routes.put('/users', UserController.update);

routes.get('/cars', CarController.index);
routes.get('/tracks', TrackController.index);
routes.get('/sectors/:pistaId', SectorController.index);
routes.get('/calibrations', CalibrationCarController.index);
routes.get('/logs', LogController.index);

routes.delete('/sectors/:setorId', SectorController.delete);

export default routes;
