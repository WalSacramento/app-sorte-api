import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createDraw(req, res) {

    try {
      const { name, award, winner } = req.body

      let draw = await prisma.draw.create({
        data: {
          name,
          award,
          winner
        }
      })

      return res.json(draw)
    } catch (error) {
      return res.json({ error })
    }
  },

  async findAllDraws(req, res) {
    try {
      const draws = await prisma.draw.findMany()
      return res.json(draws)

    } catch (error) {
      return res.json({ error })

    }
  },

  async findDraw(req, res) {
    try {
      const { id } = req.params
      const draw = await prisma.draw.findUnique({ where: { id } })

      if (!draw) return res.json({ error: "Não foram encontrados sorteios com esse nome!" })

      return res.json(draw)

    } catch (error) {
      return res.json({ error })

    }
  },

  async updateDraw(req, res) {
    try {
      const { id } = req.params
      const { name, award, winner } = req.body
      const draw = await prisma.draw.update({
        where: { id },
        data: {
          name,
          award,
          winner
        }
      })

      return res.json(draw)

    } catch (error) {
      return res.json({ error })

    }
  },

  async deleteDraw(req, res) {
    try {
      const { id } = req.params
      const draw = await prisma.draw.delete({ where: { id } })

      return res.json({ message: `Sorteio ${draw.name} deletado!`})

    } catch (error) {
      return res.json({ error })

    }
  }

}