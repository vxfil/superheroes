import { Document } from 'mongoose';

import { IImages } from './images.interface';

export interface IHero extends Document {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  images: Array<IImages>;
}
