import { Schema } from 'mongoose';

export const imageSchema = new Schema({
  public_id: String,
  url: String,
});
