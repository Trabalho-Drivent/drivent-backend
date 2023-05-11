import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  const ticketType = [
    { id: 2, name: 'Presencial sem hotel', price: 250, isRemote: false, includesHotel: false },
    { id: 3, name: 'Presencial com hotel', price: 600, isRemote: false, includesHotel: true },
    { id: 1, name: 'Online', price: 100, isRemote: true, includesHotel: false },
  ];

  await prisma.ticketType.createMany({
    data: ticketType,
  });
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
