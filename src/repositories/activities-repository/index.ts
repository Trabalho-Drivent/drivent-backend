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

const activitieRepository = {
  getActivitiesByParams,
};

export default activitieRepository;
