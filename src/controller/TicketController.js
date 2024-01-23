import { PrismaClient } from "@prisma/client";
import { generateLuckyNumbersForDraw } from "./LuckyNumbersController";

const prisma = new PrismaClient();

export default {
  async createTicket(req, res) {
    try {
      const { drawId, luckyNumber1Id, luckyNumber2Id } = req.body;

      const draw = await prisma.draw.findUnique({ where: { id: drawId } })
      // const luckyNumber1 = await prisma.luckyNumber.findUnique({ where: { id: luckyNumber1Id } })
      // const luckyNumber2 = await prisma.luckyNumber.findUnique({ where: { id: luckyNumber2Id } })

      // if (!draw) return res.json({ error: "Não foram encontrados sorteios com esse id!" })
      // if (!user) return res.json({ error: "Não foram encontrados usuários com esse id!" })
      // if (!luckyNumber1) return res.json({ error: "Não foram encontrados números da sorte com esse id!" })
      // if (!luckyNumber2) return res.json({ error: "Não foram encontrados números da sorte com esse id!" })

      const ticket = await prisma.ticket.create({
        data: {
          drawId: drawId
        },
      })


      return res.json(ticket);

    } catch (error) {
      return res.json({ error });
    }
  },

  async generateTickets(req, res) {
    try {
      const { id } = req.params;

      const draw = await prisma.draw.findUnique({ where: { id: id } })

      if (!draw) return res.json({ error: "Não foram encontrados sorteios com esse id!" })

      const tickets = await generateLuckyNumbersForDraw(id);

      return res.json(tickets);

    } catch (error) {
      console.error(error); // Adicione esta linha
      return res.json({ error });
    }
  },

  async findAllTickets(req, res) {
    try {
      const tickets = await prisma.ticket.findMany()
      return res.json(tickets)

    } catch (error) {
      return res.json({ error })

    }
  },

  async deleteTicket(req, res) {
    try {
      const { id } = req.params
      const ticket = await prisma.ticket.delete({ where: { id } })

      if (!ticket) return res.json({ error: "Não foram encontrados tickets com esse id!" })

      return res.json(ticket)

    } catch (error) {
      return res.json({ error })

    }
  },

  async reserveTicket(req, res) {
    try {
      const { id } = req.params
  
      const ticket = await prisma.ticket.findUnique({
        where: { id },
      })
  
      if (!ticket) return res.json({ error: "Não foram encontrados tickets com esse id!" })
  
      if (ticket.State !== 'AVALIABLE') return res.json({ error: "Este ticket não está disponível para reserva!" })
  
      const updatedTicket = await prisma.ticket.update({
        where: { id },
        data: {
          State: 'RESERVED'
        }
      })
  
      return res.json(updatedTicket)
  
    } catch (error) {
      return res.json({ error })
    }
  },

  async unreserveTicket(req, res) {
    try {
      const { id } = req.params

      const ticket = await prisma.ticket.findUnique({
        where: { id },
      })
  
      if (!ticket) return res.json({ error: "Não foram encontrados tickets com esse id!" })
  
      if (ticket.State !== 'UNAVALIABLE') return res.json({ error: "Este ticket não está reservado!" })
      
      const updatedTicket = await prisma.ticket.update({
        where: { id },
        data: {
          State: 'AVALIABLE'
        }
      })

      return res.json(updatedTicket)

    } catch (error) {
      return res.json({ error })

    }
  },

  async sellTicket(req, res) {
    try {
      const { id } = req.params
      const { buyerName, buyerPhoneNumber } = req.body

      const ticket = await prisma.ticket.update({
        where: { id },
        data: {
          State: 'UNAVALIABLE',
          buyerName,
          buyerPhoneNumber
        }
      })

      if (!ticket) return res.json({ error: "Não foram encontrados tickets com esse id!" })

      return res.json(ticket)

    } catch (error) {
      console.error(error); // Adicione esta linha
      return res.json({ error });

    }
  }
}