// eslint-disable-next-line
import { prisma } from '@/config';

async function getActivitiesByParams(date: string) {
  return prisma.activitiesSchedule.findMany({
    where: {
      startsAt: {
        gte: new Date(`${date}T00:00:00Z`),
        lt: new Date(`${date}T23:59:59Z`),
      },
    },
  });
}

const activitieRepository = {
  getActivitiesByParams,
};

export default activitieRepository;
