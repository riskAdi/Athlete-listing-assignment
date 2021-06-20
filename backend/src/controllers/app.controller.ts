import { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import knex from '../database';
import * as _ from "lodash";


class StationController implements Controller {
  public path = '/athletes';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {

    this.router.get(`${this.path}` , this.getAllAtheletes);
    this.router.get(`${this.path}/:id` , this.getAtheleteWithId);
    this.router.get(`${this.path}/detail/:id/:year` , this.getAtheleteDetail);
    this.router.get(`${this.path}/history/:id/` , this.getAtheleteHistory);
  }

  private getAllAtheletes = async (request: Request, response: Response, next: NextFunction) => {

    try {
      const results = await knex('Game')
      .leftJoin('AthleteResult', 'Game.game_id', '=', 'AthleteResult.game_id')
      .leftJoin('Athlete', 'AthleteResult.athlete_id', '=', 'Athlete.athlete_id')
      .groupBy('Game.year', 'AthleteResult.athlete_id')
      .orderByRaw('Game.year ASC, points DESC ')
      .select(knex.raw('sum( ( AthleteResult.gold * 5 )  +  (AthleteResult.silver * 3 ) + AthleteResult.bronze) as points,  Game.game_id, Game.year, Game.city ,  AthleteResult.athlete_id , Athlete.name, Athlete.surname'));

      const result = _.chain(results)
        .groupBy('year')
        .map((value:any, key:any) => ({ year: key, results: value }))
        .value();

      response.status(200).send({
        data : result,
      });

    } catch (e) {
      response.status(404).send(e.message);
    }
  }

  private getAtheleteWithId = async (request: Request, response: Response, next: NextFunction) => {

    try {
      const id = request.params.id;
      const results = await knex('AthletePhoto')
      .where('photo_id', id)
      .select('photo'); 
      response.writeHead(200, {
        'Content-Type': 'image/jpg'
      });
      response.end(results[0].photo);
    } catch (e) {
      response.status(404).send(e.message);
    }
  }

  private getAtheleteDetail = async (request: Request, response: Response, next: NextFunction) => {

    try {

      const id = request.params.id;
      const year = request.params.year;
      const results = await knex('Game')
      .innerJoin('AthleteResult', 'Game.game_id', '=', 'AthleteResult.game_id')
      .innerJoin('Athlete', 'AthleteResult.athlete_id', '=', 'Athlete.athlete_id')
      .where({'Game.year': year, 'AthleteResult.athlete_id': id})
      .select(knex.raw('Game.year,Game.city,AthleteResult.gold, AthleteResult.silver, AthleteResult.bronze, Athlete.*')); 
      response.status(200).send({
        data : results,
      });
    } catch (e) {
      response.status(404).send(e.message);
    }
  }

  private getAtheleteHistory = async (request: Request, response: Response, next: NextFunction) => {

    try {

      const id = request.params.id;

      const results = await knex('Game')
      .innerJoin('AthleteResult', 'Game.game_id', '=', 'AthleteResult.game_id')
      .innerJoin('Athlete', 'AthleteResult.athlete_id', '=', 'Athlete.athlete_id')
      .where({'AthleteResult.athlete_id': id})
      .select(knex.raw('Game.year,Game.city,AthleteResult.gold, AthleteResult.silver, AthleteResult.bronze')); 
      response.status(200).send({
        data : results,
      });
    } catch (e) {
      response.status(404).send(e.message);
    }

  }

}

export default StationController;
