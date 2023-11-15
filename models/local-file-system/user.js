import { readJSON } from "./utils.js"
import { randomUUID } from 'node:crypto'

const users = readJSON('../users.json')

export class UserModel {
    static getAll

    static async getById ({id}) {
        const user = users.find(user => user.id == id)
        return user
    }

    static async create ({input}) {
        const newUser = {
            id: randomUUID(),
            ...input
        }
    
        users.push(newUser)

        return newUser
    }

    static async delete ({ id }) {
        const userIndex = users.findIndex(user => user.id == id)
        if (userIndex == -1) return false

        users.splice(userIndex, 1)
        return true
    }

    static async update ({ id, input }) {
        const userIndex = users.findIndex(user => user.id == id)
        if (userIndex == -1) return false

        users[userIndex] = {
            ...users[userIndex],
            ...input
        }
        return users[userIndex]
    }
}