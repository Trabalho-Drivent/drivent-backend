import { prisma } from '@/config';
import { redis } from '@/config/redis';

async function findFirst() {
  const cacheKey = 'event';
  const chachedEvent = await redis.get(cacheKey);

  if (chachedEvent) {
    const event = JSON.parse(chachedEvent);
    return event;
  }

  const event = await prisma.event.findFirst();

  redis.set(cacheKey, JSON.stringify(event));

  return event;
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
