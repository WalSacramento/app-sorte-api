import { Router } from "express"
import UserController from './controller/UserController'

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


export { router }