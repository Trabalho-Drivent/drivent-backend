import { Router } from 'express';
/* eslint-disable */
import { getActivitiesByParams } from '@/controllers';
import { authenticateToken, validateParams } from '@/middlewares';
import { activitieSchema } from '@/schemas/activitie-schemas';
/* eslint-enable */

const activitiesRouter = Router();
activitiesRouter.all('/*', authenticateToken).get('/:date', validateParams(activitieSchema), getActivitiesByParams);

export { activitiesRouter };
