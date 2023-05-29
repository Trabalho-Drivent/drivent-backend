import { Router } from 'express';
/* eslint-disable */
import { getActivitiesByParams, addActivityInscription, getUserActivities } from '@/controllers';
import { authenticateToken, validateParams } from '@/middlewares';
import { activitySchema } from '@/schemas/activities-schemas';
/* eslint-enable */

const activitiesRouter = Router();
activitiesRouter
  .all('/*', authenticateToken)
  .post('/:activityId', addActivityInscription)
  .get('/user', getUserActivities)
  .get('/:date', validateParams(activitySchema), getActivitiesByParams);

export { activitiesRouter };
