import express from 'express';
import { v2 as cloudinary } from 'cloudinary';

import { heroModel } from '../models/heroModel';
import { IImages } from '../interfaces/images.interface';

export const createHero = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await new heroModel(req.body).save();
    res.status(201).send('Hero is created!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong!');
  }
};

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

export const getHeroes = async (
  req: express.Request,
  res: express.Response
) => {
  const { p, l } = req.query;
  const page = Number(p);
  const limit = Number(l);
  try {
    const heroes = await heroModel
      .find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await heroModel.countDocuments();

    res.send({
      heroes,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const getHero = async (req: express.Request, res: express.Response) => {
  try {
    const { hero_id } = req.params;
    const hero = await heroModel.findById(hero_id);
    res.send(hero);
  } catch (err) {
    console.error(err);
  }
};

export const deleteImage = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { public_id } = req.params;
    console.log(public_id);
  } catch (err) {
    console.log(err);
  }
};
