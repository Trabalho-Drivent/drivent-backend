import Joi from 'joi';
import JoiDate from '@joi/date';
import { ActivitieParams } from '@/protocols';

const JoiBase = Joi.extend(JoiDate);

export const activitieSchema = Joi.object<ActivitieParams>({
  date: JoiBase.date().format('YYYY-MM-DD'),
});
