import 'dotenv/config';
import App from './app';
import AppController from './controllers/app.controller';
const app = new App(
  [
    new AppController()
  ],
);

app.listen();
