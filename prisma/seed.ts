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
    {
      id: 2,
      name: 'Hotel Canabrava',
      image: 'https://delmond.com.br/wp-content/uploads/2021/12/piscina-delmond-hotel-8.jpg',
    },
    {
      id: 3,
      name: 'Hotel Tororomba',
      image: 'https://kembalihotel.com/images/opengraph/kembali-hotel-praia-porto-de-galinhas-2.jpg',
    },
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

  const locals = [
    { id: 1, name: 'Auditório Principal' },
    { id: 2, name: 'Auditório Lateral' },
    { id: 3, name: 'Sala de Workshop' },
  ];

  const activitiesSchedule = [
    { id: 1, startsAt: new Date('2023-05-10T09:00:00.000'), endsAt: new Date('2023-05-10T10:00:00.000'), localId: 1 },
    { id: 2, startsAt: new Date('2023-05-10T10:00:00.000'), endsAt: new Date('2023-05-10T12:00:00.000'), localId: 1 },
    { id: 3, startsAt: new Date('2023-05-10T12:00:00.000'), endsAt: new Date('2023-05-10T13:00:00.000'), localId: 1 },
    { id: 4, startsAt: new Date('2023-05-10T07:00:00.000'), endsAt: new Date('2023-05-10T08:00:00.000'), localId: 2 },
    { id: 5, startsAt: new Date('2023-05-10T09:00:00.000'), endsAt: new Date('2023-05-10T10:00:00.000'), localId: 2 },
    { id: 6, startsAt: new Date('2023-05-10T10:00:00.000'), endsAt: new Date('2023-05-10T11:00:00.000'), localId: 2 },
    { id: 7, startsAt: new Date('2023-05-10T07:00:00.000'), endsAt: new Date('2023-05-10T09:00:00.000'), localId: 3 },
    { id: 8, startsAt: new Date('2023-05-10T10:00:00.000'), endsAt: new Date('2023-05-10T11:00:00.000'), localId: 3 },
    { id: 9, startsAt: new Date('2023-05-10T12:00:00.000'), endsAt: new Date('2023-05-10T14:00:00.000'), localId: 3 },
    { id: 10, startsAt: new Date('2023-06-10T09:00:00.000'), endsAt: new Date('2023-06-10T10:00:00.000'), localId: 1 },
    { id: 11, startsAt: new Date('2023-06-10T10:00:00.000'), endsAt: new Date('2023-06-10T12:00:00.000'), localId: 1 },
    { id: 12, startsAt: new Date('2023-06-10T12:00:00.000'), endsAt: new Date('2023-06-10T13:00:00.000'), localId: 1 },
    { id: 13, startsAt: new Date('2023-06-10T07:00:00.000'), endsAt: new Date('2023-06-10T08:00:00.000'), localId: 2 },
    { id: 14, startsAt: new Date('2023-06-10T09:00:00.000'), endsAt: new Date('2023-06-10T10:00:00.000'), localId: 2 },
    { id: 15, startsAt: new Date('2023-06-10T10:00:00.000'), endsAt: new Date('2023-06-10T11:00:00.000'), localId: 2 },
    { id: 16, startsAt: new Date('2023-06-10T07:00:00.000'), endsAt: new Date('2023-06-10T09:00:00.000'), localId: 3 },
    { id: 17, startsAt: new Date('2023-06-10T10:00:00.000'), endsAt: new Date('2023-06-10T11:00:00.000'), localId: 3 },
    { id: 18, startsAt: new Date('2023-06-10T12:00:00.000'), endsAt: new Date('2023-06-10T14:00:00.000'), localId: 3 },
    { id: 19, startsAt: new Date('2023-07-10T09:00:00.000'), endsAt: new Date('2023-07-10T10:00:00.000'), localId: 1 },
    { id: 20, startsAt: new Date('2023-07-10T10:00:00.000'), endsAt: new Date('2023-07-10T12:00:00.000'), localId: 1 },
    { id: 21, startsAt: new Date('2023-07-10T12:00:00.000'), endsAt: new Date('2023-07-10T13:00:00.000'), localId: 1 },
    { id: 22, startsAt: new Date('2023-07-10T07:00:00.000'), endsAt: new Date('2023-07-10T08:00:00.000'), localId: 2 },
    { id: 23, startsAt: new Date('2023-07-10T09:00:00.000'), endsAt: new Date('2023-07-10T10:00:00.000'), localId: 2 },
    { id: 24, startsAt: new Date('2023-07-10T10:00:00.000'), endsAt: new Date('2023-07-10T11:00:00.000'), localId: 2 },
    { id: 25, startsAt: new Date('2023-07-10T07:00:00.000'), endsAt: new Date('2023-07-10T09:00:00.000'), localId: 3 },
    { id: 26, startsAt: new Date('2023-07-10T10:00:00.000'), endsAt: new Date('2023-07-10T11:00:00.000'), localId: 3 },
    { id: 27, startsAt: new Date('2023-07-10T12:00:00.000'), endsAt: new Date('2023-07-10T14:00:00.000'), localId: 3 },
    { id: 28, startsAt: new Date('2023-07-10T15:00:00.000'), endsAt: new Date('2023-07-10T16:00:00.000'), localId: 3 },
  ];

  const activies = [
    {
      name: 'Explorando a Tecnologia com Especialistas',
      slot: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduleId: 1,
    },
    {
      name: 'Aprendendo na Prática: Tecnologia em Ação',
      slot: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduleId: 2,
    },
    { name: 'Inovação Tecnológica em Destaque', slot: 45, createdAt: new Date(), updatedAt: new Date(), scheduleId: 3 },

    { name: 'Exposição de Startups e Empresas', slot: 45, createdAt: new Date(), updatedAt: new Date(), scheduleId: 4 },
    {
      name: 'Hackathon: Desenvolvendo Soluções Tecnológicas em Tempo Real',
      slot: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduleId: 5,
    },
    {
      name: 'Apresentando Ideias Inovadoras no Setor de Tecnologia',
      slot: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduleId: 6,
    },

    { name: 'Jogos e Realidade Virtual', slot: 45, createdAt: new Date(), updatedAt: new Date(), scheduleId: 7 },
    { name: 'Debate sobre Ética na Tecnologia', slot: 45, createdAt: new Date(), updatedAt: new Date(), scheduleId: 8 },
    { name: 'Criando Protótipos', slot: 45, createdAt: new Date(), updatedAt: new Date(), scheduleId: 9 },

    {
      name: 'Explorando a Tecnologia com Especialistas',
      slot: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduleId: 10,
    },
    {
      name: 'Aprendendo na Prática: Tecnologia em Ação',
      slot: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduleId: 11,
    },
    {
      name: 'Inovação Tecnológica em Destaque',
      slot: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduleId: 12,
    },

    {
      name: 'Exposição de Startups e Empresas',
      slot: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduleId: 13,
    },
    {
      name: 'Hackathon: Desenvolvendo Soluções Tecnológicas em Tempo Real',
      slot: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduleId: 14,
    },
    {
      name: 'Apresentando Ideias Inovadoras no Setor de Tecnologia',
      slot: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduleId: 15,
    },
    { name: 'Jogos e Realidade Virtual', slot: 45, createdAt: new Date(), updatedAt: new Date(), scheduleId: 16 },
    {
      name: 'Debate sobre Ética na Tecnologia',
      slot: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduleId: 17,
    },
    { name: 'Criando Protótipos', slot: 45, createdAt: new Date(), updatedAt: new Date(), scheduleId: 18 },
    {
      name: 'Explorando a Tecnologia com Especialistas',
      slot: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduleId: 19,
    },
    {
      name: 'Aprendendo na Prática: Tecnologia em Ação',
      slot: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduleId: 20,
    },
    {
      name: 'Inovação Tecnológica em Destaque',
      slot: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduleId: 21,
    },
    {
      name: 'Exposição de Startups e Empresas',
      slot: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduleId: 22,
    },
    {
      name: 'Hackathon: Desenvolvendo Soluções Tecnológicas em Tempo Real',
      slot: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduleId: 23,
    },
    {
      name: 'Apresentando Ideias Inovadoras no Setor de Tecnologia',
      slot: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduleId: 24,
    },
    { name: 'Jogos e Realidade Virtual', slot: 45, createdAt: new Date(), updatedAt: new Date(), scheduleId: 25 },
    {
      name: 'Debate sobre Ética na Tecnologia',
      slot: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
      scheduleId: 26,
    },
    { name: 'Criando Protótipos', slot: 45, createdAt: new Date(), updatedAt: new Date(), scheduleId: 27 },
    { name: 'Encerramento', slot: 45, createdAt: new Date(), updatedAt: new Date(), scheduleId: 28 },
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

  await prisma.activities.deleteMany({});
  await prisma.activitiesSchedule.deleteMany({});
  await prisma.activitiesLocal.deleteMany({});

  await prisma.activitiesLocal.createMany({
    data: locals,
  });

  await prisma.activitiesSchedule.createMany({
    data: activitiesSchedule,
  });

  await prisma.activities.createMany({
    data: activies,
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