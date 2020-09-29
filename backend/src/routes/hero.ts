import express from 'express';
import * as heroController from '../controllers/heroController';

const heroRouter = express.Router();

heroRouter.post('create_hero', heroController.createHero);

export default heroRouter;
