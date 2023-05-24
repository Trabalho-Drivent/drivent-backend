import { NextFunction, Response } from 'express';
/* eslint-disable */
import { AuthenticatedRequest } from '@/middlewares';
import activitieService from '@/services/activities-service';
/* eslint-enable */

export async function getActivitiesByParams(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { date } = req.params;
  try {
    const activities = await activitieService.getActivitiesByParams(date);
    res.send(activities);
  } catch (error) {
    console.log(error);
    next(error);
  }
}
