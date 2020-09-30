import express from 'express';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

import { heroModel } from '../models/heroModel';
import { IImages } from '../interfaces/images.interface';

export const createHero = async (
  req: express.Request,
  res: express.Response
) => {};

export const uploadImages = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const images: any = req.files;
    const result: IImages[] = [];
    for (let img of images) {
      const { buffer, mimetype } = img;
      const data = buffer.toString('base64');
      const uri = `data:${mimetype};base64,${data}`;
      const uploaded = await cloudinary.uploader.upload(uri);
      const { public_id, url } = uploaded;
      result.push({ public_id, url });
    }
    res.send({ result });
  } catch (err) {
    console.log(err);
  }
};
