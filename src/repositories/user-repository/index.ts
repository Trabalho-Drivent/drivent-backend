import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

async function findByEmailAndToken(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      Session: {
        select: {
          token: true,
        },
      },
    },
  });
}

const userRepository = {
  findByEmail,
  create,
  findByEmailAndToken,
};

export default userRepository;
