import { Document } from 'mongoose';

export interface IHero extends Document {
  nickname: String;
  real_name: String;
  origin_description: String;
  superpowers: String;
  catch_phrase: String;
  images: Array<String>;
}
