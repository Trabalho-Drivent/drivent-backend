import { Hotel, Room } from '@prisma/client';
import hotelRepository from '@/repositories/hotel-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';
import { cannotListHotelsError } from '@/errors/cannot-list-hotels-error';
import bookingRepository from '@/repositories/booking-repository';
import roomRepository from '@/repositories/room-repository';

type HotelWithRoom = Hotel & {
  totalAvailableRooms?: number;
  types?: string;
  Rooms: {
    id: number;
    name: string;
    capacity: number;
    hotelId: number;
    createdAt: Date;
    updatedAt: Date;
    available?: number;
  }[];
};

type NewHotel = {
  id: number;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  types?: string;
  totalAvailableRooms?: number;
}[];

async function listHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotListHotelsError();
  }
}

async function getHotels(userId: number) {
  await listHotels(userId);

  const hotels = await hotelRepository.findHotels();
  if (!hotels || hotels.length === 0) {
    throw notFoundError();
  }

  const updatedHotels: NewHotel = [...hotels];

  for (let i = 0; i < updatedHotels.length; i++) {
    const rooms = await roomRepository.findAllByHotelId(updatedHotels[i].id);

    let totalAvailableRooms = 0;
    const capacity: number[] = [];
    const roomTypes = ['Single', 'Double', 'Triple'];

    for (let j = 0; j < rooms.length; j++) {
      const bookings = await bookingRepository.findByRoomId(rooms[j].id);
      const availableRooms = rooms[j].capacity - bookings.length;

      totalAvailableRooms += availableRooms;
      if (!capacity.includes(rooms[j].capacity)) capacity.push(rooms[j].capacity);
    }

    capacity.sort();
    let roomTypesString = '';
    capacity.forEach((rt) => (roomTypesString += `${roomTypes[rt - 1]}, `));
    const roomTypesStringFormatted = roomTypesString.slice(0, roomTypesString.length - 2);

    updatedHotels[i].totalAvailableRooms = totalAvailableRooms;
    updatedHotels[i].types = roomTypesStringFormatted;
  }

  return updatedHotels;
}

async function getHotelsWithRooms(userId: number, hotelId: number) {
  await listHotels(userId);

  const hotel = await hotelRepository.findRoomsByHotelId(hotelId);

  if (!hotel || hotel.Rooms.length === 0) {
    throw notFoundError();
  }

  const hotelUpdated: HotelWithRoom = { ...hotel };

  let totalAvailableRooms = 0;
  const capacity: number[] = [];
  const roomTypes = ['Single', 'Double', 'Triple'];

  for (let i = 0; i < hotelUpdated.Rooms.length; i++) {
    const bookings = await bookingRepository.findByRoomId(hotelUpdated.Rooms[i].id);
    const availableRooms = hotelUpdated.Rooms[i].capacity - bookings.length;

    hotelUpdated.Rooms[i].available = availableRooms;
    totalAvailableRooms += availableRooms;

    if (!capacity.includes(hotelUpdated.Rooms[i].capacity)) {
      capacity.push(hotelUpdated.Rooms[i].capacity);
    }
  }

  capacity.sort();
  let roomTypesString = '';
  capacity.forEach((rt) => (roomTypesString += `${roomTypes[rt - 1]}, `));
  const roomTypesStringFormatted = roomTypesString.slice(0, roomTypesString.length - 2);

  hotelUpdated.totalAvailableRooms = totalAvailableRooms;
  hotelUpdated.types = roomTypesStringFormatted;

  return hotelUpdated;
}

export default {
  getHotels,
  getHotelsWithRooms,
  listHotels,
};
