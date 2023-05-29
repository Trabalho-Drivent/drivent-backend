import { NextFunction, Response } from 'express';
/* eslint-disable */
import { AuthenticatedRequest } from '@/middlewares';
import activityService from '@/services/activities-service';
/* eslint-enable */

export async function getActivitiesByParams(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { date } = req.params;
  try {
    const activities = await activityService.getActivitiesByParams(date);
    res.send(activities);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getUserActivities(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  try {
    const userActivities = await activityService.getUserActivities(userId);
    res.send(userActivities);
  } catch (error) {
    next(error);
  }
}

export async function addActivityInscription(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const activityId: number = +req.params.activityId;

  try {
    const newActivity = await activityService.addActivityInscription(userId, activityId);
    res.send(newActivity);
  } catch (error) {
    next(error);
  }
}
