import { Schema } from 'mongoose';

import { imageSchema } from './imageSchema';

export const heroSchema = new Schema({
  nickname: { type: String, required: true },
  real_name: { type: String, required: true },
  origin_description: { type: String, required: true },
  superpowers: { type: String, required: true },
  catch_phrase: { type: String, required: true },
  images: { type: [imageSchema], required: true },
});
