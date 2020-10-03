import express from 'express';
import * as heroController from '../controllers/heroController';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const heroRouter = express.Router();

heroRouter.post('/create_hero', heroController.createHero);
heroRouter.post(
  '/upload_images',
  upload.array('images'),
  heroController.uploadImages
);
heroRouter.get('/get_heroes', heroController.getHeroes);
heroRouter.get('/get_hero/:hero_id', heroController.getHero);
heroRouter.delete('/delete_image/:public_id', heroController.deleteImage);

export default heroRouter;
