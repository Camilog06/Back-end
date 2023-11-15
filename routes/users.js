import { Router } from "express";
import { UserController } from "../controlers/users.js"


export const usersRouter = Router()

usersRouter.get('/', UserController.getAll)

usersRouter.get('/:id', UserController.getById)

usersRouter.post('/', UserController.create)

usersRouter.delete('/:id', UserController.delete)

usersRouter.patch('/:id', UserController.update)

usersRouter.options('/:id', (req, res) => {
    const origin = req.header('origin')
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    }
    res.send(200)
})