// eslint-disable-next-line
import { prisma } from '@/config';

async function getActivitiesByParams(date: string) {
  const newDate = new Date(date);
  return prisma.activitiesSchedule.findMany({
    where: {
      startsAt: {
        equals: newDate,
      },
    },
  });
}

const activitieRepository = {
  getActivitiesByParams,
};

export default activitieRepository;
