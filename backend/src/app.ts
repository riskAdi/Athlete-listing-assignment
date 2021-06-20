import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import Controller from './interfaces/controller.interface';
import * as cluster from 'cluster';
import * as cors from "cors";

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  public listen() {

    if (cluster.isMaster) {
      // Fork workers.
      const numCPUs = require('os').cpus().length;
      for (let i:number = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker, code, signal) => {
        console.log('worker ' + worker.process.pid + ' died');
      });

     } else {
      this.app.listen(process.env.PORT, () => {
        console.log(`App listening on the port ${process.env.PORT}`);
      });
   }
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/api/v1', controller.router);
    });
  }
}

export default App;
