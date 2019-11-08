import 'dotenv/config';
import * as Sentry from '@sentry/node';
import express from 'express';
import sentryConfig from './config/sentry';
import 'express-async-errors';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();
    Sentry.init(sentryConfig);

    this.midldewares();
    this.routes();
  }

  midldewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }
}
export default new App().server;
