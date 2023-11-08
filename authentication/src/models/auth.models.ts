import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const findByEmail = async (email: string) => {
  await prisma.$connect();
  try {
    return await prisma.credentials.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        is_active: true,
      },
    });
  } finally {
    await prisma.$disconnect();
  }
};

const findById = async (id: string) => {
  try {
    return await prisma.credentials.findUnique({
      where: {
        id,
      },
    });
  } finally {
    await prisma.$disconnect();
  }
};

export { findByEmail, findById };
