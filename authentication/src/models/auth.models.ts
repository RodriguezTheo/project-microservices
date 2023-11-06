import { PrismaClient } from "@prisma/client";
import { config } from "@/environment/config";
const prisma = new PrismaClient();

const findByEmail = async (email: string) => {
  console.log(config);
  await prisma.$connect();
  try {
    const data = await prisma.credentials.findUnique({
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
    console.log(data);
    return data;
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
      select: {
        id: true,
        email: true,
        password: true,
        reset_password_requested: true,
        reset_password_required: true,
        is_active: true,
        password_reset_tokens: true,
        sessions: true,
      },
    });
  } finally {
    await prisma.$disconnect();
  }
};

export { findByEmail, findById };
