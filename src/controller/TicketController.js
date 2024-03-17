import { PrismaClient } from "@prisma/client";
import { generateLuckyNumbersForDraw } from "./LuckyNumbersController";

const prisma = new PrismaClient();

export default {
  async createTicket(req, res) {
    try {
      const { drawId, luckyNumber1Id, luckyNumber2Id } = req.body;

      const draw = await prisma.draw.findUnique({ where: { id: drawId } })

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

  async findAllTicketsForDraw(req, res) {
    try {
      const { drawId } = req.params;
      const page = Number(req.query.page);
      const pageSize = Number(req.query.pageSize);

      const tickets = await prisma.ticket.findMany({
        where: {
          drawId
        },
        take: pageSize,
        skip: (page - 1) * pageSize
      });

      return res.json(tickets);

    } catch (error) {
      console.error(error);
      return res.json({ error });
    }
  },

  async findAvailableTicketsForDraw(req, res) {
    try {
      const { drawId } = req.params;
      const page = Number(req.query.page);
      const pageSize = Number(req.query.pageSize);

      const tickets = await prisma.ticket.findMany({
        where: {
          drawId,
          State: 'AVAILABLE'
        },
        skip: (page - 1) * pageSize,
        take: pageSize
      });

      return res.json(tickets);

    } catch (error) {
      console.error(error); // Adicione esta linha
      return res.json({ error });
    }
  },

  async findAvailableTickets(req, res) {
    try {
      const { page } = req.query;

      const tickets = await prisma.ticket.findMany({
        where: {
          State: 'AVAILABLE'
        },
        skip: (page - 1) * 20,
        take: 20
      });

      return res.json(tickets);

    } catch (error) {
      console.error(error); // Adicione esta linha
      return res.json({ error });
    }
  },

  async findTicketForCellphone(req, res) {
    try {
      const { cellphone } = req.params;

      const tickets = await prisma.ticket.findMany({
        where: {
          buyerPhoneNumber: cellphone
        }
      });

      return res.json(tickets);

    } catch (error) {
      console.error(error); // Adicione esta linha
      return res.json({ error });
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

      if (ticket.State !== 'AVAILABLE') return res.json({ error: "Este ticket não está disponível para reserva!" })

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

  async reserveTickets(req, res) {
    try {
      const { tickets } = req.body
      const reservedTickets = []

      for (const id of tickets) {
        const ticket = await prisma.ticket.findUnique({ where: { id } })

        if (ticket && ticket.State === 'AVAILABLE') {
          const updatedTicket = await prisma.ticket.update({
            where: { id },
            data: { State: 'RESERVED' }
          })
          reservedTickets.push(updatedTicket)
        }
      }

      if (reservedTickets.length !== tickets.length) {
        return res.json({ success: "Alguns bilhetes não puderam ser reservados!", reservedTickets })
      }

      return res.json({ success: `Reservados ${reservedTickets.length} bilhetes`, reservedTickets })

    } catch (error) {
      return res.json({ error })
    }
  },

  async findReservedTickets(req, res) {
    try {
      const { tickets } = req.body

      const reservedTickets = await prisma.ticket.findMany({
        where: {
          id: {
            in: tickets,
          },
          State: 'RESERVED',
        }
      })

      return res.json(reservedTickets)
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

      if (ticket.State !== 'UNAVAILABLE') return res.json({ error: "Este ticket não está reservado!" })

      const updatedTicket = await prisma.ticket.update({
        where: { id },
        data: {
          State: 'AVAILABLE'
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
      const { buyerName, buyerPhoneNumber, sellerId } = req.body

      const seller = await prisma.user.findUnique({ where: { id: sellerId } })

      if (!seller) return res.json({ error: "Não foi encontrado um usuário com esse id!" })

      const ticket = await prisma.ticket.update({
        where: { id },
        data: {
          State: 'UNAVAILABLE',
          buyerName,
          buyerPhoneNumber,
          sellerId
        }
      })

      if (!ticket) return res.json({ error: "Não foram encontrados tickets com esse id!" })

      return res.json(ticket)

    } catch (error) {
      console.error(error); // Adicione esta linha
      return res.json({ error });

    }
  },

  async sellTickets(req, res) {
    try {
      const { tickets, buyerName, buyerPhoneNumber, sellerId } = req.body
      const soldTickets = []

      const seller = await prisma.user.findUnique({ where: { id: sellerId } })

      if (!seller) return res.json({ error: "Não foi encontrado um usuário com esse id!" })

      for (const id of tickets) {
        const ticket = await prisma.ticket.findUnique({ where: { id } })

        if (ticket && ticket.State === 'RESERVED') {
          const updatedTicket = await prisma.ticket.update({
            where: { id },
            data: {
              State: 'UNAVAILABLE',
              buyerName,
              buyerPhoneNumber,
              sellerId
            }
          })
          soldTickets.push(updatedTicket)
        }
      }

      if (soldTickets.length !== tickets.length) {
        return res.json({ success: "Alguns bilhetes não puderam ser vendidos!", soldTickets })
      }

      return res.json({ success: `Vendidos ${soldTickets.length} bilhetes`, soldTickets })

    } catch (error) {
      return res.json({ error })
    }
  }
}