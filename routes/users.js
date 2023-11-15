import { Router } from "express";
import { UserController } from "../controlers/users.js"


export const usersRouter = Router()

usersRouter.get('/', UserController.getAll)

usersRouter.post('/', UserController.create)

usersRouter.delete('/:name', UserController.delete)

usersRouter.patch('/:name', UserController.update)

usersRouter.options('/:id', (req, res) => {
    const origin = req.header('origin')
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    }
    res.send(200)
})