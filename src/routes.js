import { Router } from "express"
import UserController from './controller/UserController'
import DrawController from './controller/DrawController'
import TicketController from "./controller/TicketController"
import LuckyNumbersController from "./controller/LuckyNumbersController"

const router = Router()

router.get('/', (req, res) => {
  return res.json({ hello: 'world' })
})

router.route('/user')
  .post(UserController.createUser)

router.route('/user/:id')
  .get(UserController.findUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser)

router.route('/users')
  .get(UserController.findAllUsers)

router.route('/draw')
  .post(DrawController.createDraw)

router.route('/draw/:id')
  .get(DrawController.findDraw)
  .put(DrawController.updateDraw)
  .delete(DrawController.deleteDraw)
  .post(DrawController.updateWinner)

router.route("/draws")
  .get(DrawController.findAllDraws)

router.route('/ticket')
  .post(TicketController.createTicket)
  .get(TicketController.findAllTickets)

router.route('/ticket/:id')
  .delete(TicketController.deleteTicket)
  .get(TicketController.generateTickets)
  .put(TicketController.reserveTicket)
  .post(TicketController.sellTicket)

router.route('/unreserve-ticket/:id')
  .put(TicketController.unreserveTicket)

export { router }