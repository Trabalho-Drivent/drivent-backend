// eslint-disable-next-line
import { prisma } from '@/config';

async function getActivitiesByParams(date: string) {
  const activities = await prisma.activities.findMany({
    where: {
      ActivitiesSchedule: {
        startsAt: {
          gte: new Date(`${date}T00:00:00Z`),
          lt: new Date(`${date}T23:59:59Z`),
        },
      },
    },
    include: {
      ActivitiesSchedule: {
        include: {
          ActivitiesLocal: true,
        },
      },
    },
    orderBy: {
      ActivitiesSchedule: {
        startsAt: 'asc',
      },
    },
  });

  // Objeto para agrupar as atividades por local
  const activitiesByLocal: Record<number, { id: number; name: string; activities: any[] }> = {};

  activities.forEach((activity) => {
    const {
      ActivitiesSchedule,
      ActivitiesSchedule: { ActivitiesLocal },
    } = activity;

    if (ActivitiesLocal) {
      const { id, name } = ActivitiesLocal;

      if (!activitiesByLocal[id]) {
        activitiesByLocal[id] = {
          id,
          name,
          activities: [],
        };
      }

      activitiesByLocal[id].activities.push({
        id: activity.id,
        name: activity.name,
        startsAt: ActivitiesSchedule.startsAt,
        endsAt: ActivitiesSchedule.endsAt,
        slot: activity.slot,
      });
    }
  });

  // Converter o objeto em um array de objetos
  const result = Object.values(activitiesByLocal);

  return result;
}

async function getActivityById(activityId: number) {
  const activity = await prisma.activities.findFirst({
    where: { id: activityId },
    include: {
      ActivitiesSchedule: true,
    },
  });

  return activity;
}

async function getUserActivities(userId: number) {
  const userActivities = await prisma.userActivities.findMany({
    where: { userId },
    include: {
      Activities: {
        include: {
          ActivitiesSchedule: true,
        },
      },
    },
  });

  return userActivities;
}

async function getActivityInscriptions(activityId: number) {
  const activities = await prisma.userActivities.findMany({
    where: { activityId },
  });

  return activities;
}

async function addActivityInscription(userId: number, activityId: number) {
  const activities = await prisma.userActivities.create({
    data: { userId, activityId },
  });

  return activities;
}

const activityRepository = {
  getActivitiesByParams,
  getUserActivities,
  getActivityInscriptions,
  addActivityInscription,
  getActivityById,
};

export default activityRepository;
