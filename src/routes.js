import { Router } from "express"
import UserController from './controller/UserController'
import DrawController from './controller/DrawController'

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

router.route("/draws")
  .get(DrawController.findAllDraws)

export { router }