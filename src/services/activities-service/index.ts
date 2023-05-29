/* eslint-disable */
import { conflictError } from '@/errors';
import activityRepository from '@/repositories/activities-repository';
/* eslint-enable */

async function getActivitiesByParams(date: string) {
  const activities = await activityRepository.getActivitiesByParams(date);

  const activitiesWithAvailableSlots = [...activities];
  for (let i = 0; i < activitiesWithAvailableSlots.length; i++) {
    for (let j = 0; j < activitiesWithAvailableSlots[i].activities.length; j++) {
      const capacity = activitiesWithAvailableSlots[i].activities[j].slot;
      const activityId = activitiesWithAvailableSlots[i].activities[j].id;
      const activities = await activityRepository.getActivityInscriptions(activityId);
      const numOfUnavailableSeats = activities.length;
      activitiesWithAvailableSlots[i].activities[j].available = capacity - numOfUnavailableSeats;
    }
  }

  return activitiesWithAvailableSlots;
}

async function getUserActivities(userId: number) {
  const userActivities = await activityRepository.getUserActivities(userId);

  return userActivities;
}

async function addActivityInscription(userId: number, activityId: number) {
  const userActivities = await activityRepository.getUserActivities(userId);

  if (userActivities.length > 0) {
    const activity = await activityRepository.getActivityById(activityId);
    const activityStartTime = activity.ActivitiesSchedule.startsAt;
    const activityEndTime = activity.ActivitiesSchedule.endsAt;

    for (let i = 0; i < userActivities.length; i++) {
      const userActivitiesSchedule = userActivities[i].Activities.ActivitiesSchedule;
      const userActivityStartTime = userActivitiesSchedule.startsAt;
      const userActivityEndTime = userActivitiesSchedule.endsAt;
      const timeConflict = checkTimeConflict(
        activityStartTime,
        activityEndTime,
        userActivityStartTime,
        userActivityEndTime,
      );

      if (timeConflict) {
        throw conflictError('Time conflict');
      }
    }
  }

  const newInscription = await activityRepository.addActivityInscription(userId, activityId);
  return newInscription;
}

function checkTimeConflict(startTime1: Date, endTime1: Date, startTime2: Date, endTime2: Date) {
  if (startTime1 <= startTime2 && endTime1 >= startTime2) return true;
  if (startTime2 <= startTime1 && endTime2 >= startTime1) return true;
  return false;
}

const activityService = {
  getActivitiesByParams,
  getUserActivities,
  addActivityInscription,
};

export default activityService;
