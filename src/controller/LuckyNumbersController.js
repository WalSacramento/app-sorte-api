import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export async function generateLuckyNumbersForDraw(drawId) {
  // Cria uma lista de todos os números possíveis
  const allNumbers = Array.from({length: 10000}, (_, i) => i);

  // Embaralha a lista
  shuffleArray(allNumbers);

  // Cria 5000 Tickets
  for (let i = 0; i < 5000; i++) {
    const luckyNumber1 = allNumbers[i * 2];
    const luckyNumber2 = allNumbers[i * 2 + 1];

    await prisma.ticket.create({
      data: {
        drawId: drawId,
        luckyNumber1: luckyNumber1,
        luckyNumber2: luckyNumber2,
        State: 'AVALIABLE',
      },
    });
  }

  return allNumbers;
}
