/* eslint-disable */
import activitieRepository from '@/repositories/activities-repository';
/* eslint-enable */

async function getActivitiesByParams(date: string) {
  const res = await activitieRepository.getActivitiesByParams(date);
  return res;
}

const activitieService = {
  getActivitiesByParams,
};

export default activitieService;
