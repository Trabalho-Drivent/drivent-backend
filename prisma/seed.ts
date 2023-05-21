import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  const ticketType = [
    { id: 2, name: 'Presencial sem hotel', price: 250, isRemote: false, includesHotel: false },
    { id: 3, name: 'Presencial com hotel', price: 600, isRemote: false, includesHotel: true },
    { id: 1, name: 'Online', price: 100, isRemote: true, includesHotel: false },
  ];

  const hotel = [
    { id: 1, name: 'Hotel Atlântico', image: 'https://delmond.com.br/wp-content/uploads/2023/01/SNT_7138.jpg' },
    { id: 2, name: 'Hotel Canabrava', image: 'https://delmond.com.br/wp-content/uploads/2021/12/piscina-delmond-hotel-8.jpg' },
    { id: 3, name: 'Hotel Tororomba', image: 'https://kembalihotel.com/images/opengraph/kembali-hotel-praia-porto-de-galinhas-2.jpg' },
  ];

  const room = [
    { name: '1', capacity: 2, hotelId: 1 },
    { name: '2', capacity: 3, hotelId: 1 },
    { name: '3', capacity: 3, hotelId: 1 },
    { name: '4', capacity: 1, hotelId: 1 },
    { name: '5', capacity: 2, hotelId: 1 },
    { name: '6', capacity: 3, hotelId: 1 },
    { name: '1', capacity: 2, hotelId: 2 },
    { name: '2', capacity: 3, hotelId: 2 },
    { name: '3', capacity: 2, hotelId: 2 },
    { name: '4', capacity: 2, hotelId: 2 },
    { name: '1', capacity: 3, hotelId: 3 },
    { name: '2', capacity: 3, hotelId: 3 },
    { name: '3', capacity: 1, hotelId: 3 },
    { name: '4', capacity: 2, hotelId: 3 },
    { name: '5', capacity: 2, hotelId: 3 },
  ];

  
  await prisma.hotel.deleteMany({});
  await prisma.hotel.createMany({
    data: hotel,
  });

  await prisma.room.deleteMany({});
  await prisma.room.createMany({
    data: room,
  });

  await prisma.ticketType.deleteMany({});
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
