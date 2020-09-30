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

export default heroRouter;
