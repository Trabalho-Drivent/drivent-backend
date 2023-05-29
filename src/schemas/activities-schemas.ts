import Joi from 'joi';
import JoiDate from '@joi/date';
import { ActivityParams } from '@/protocols';

const JoiBase = Joi.extend(JoiDate);

export const activitySchema = Joi.object<ActivityParams>({
  date: JoiBase.date().format('YYYY-MM-DD'),
});
