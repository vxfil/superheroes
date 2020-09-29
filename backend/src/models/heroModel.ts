import { model } from 'mongoose';
import { heroSchema } from '../schemas/heroSchema';
import { IHero } from '../interfaces/hero.interface';

export const heroModel = model<IHero>('Hero', heroSchema);
