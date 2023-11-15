import { UserModel } from "../models/mysql/movie.js";
import { validateUser, validatePartialUser } from "../schemes/users.js";

export class UserController {
    static async getAll(req, res) {
        if (req.mysql) {
          const users = await UserModel.getAll({ pool: req.mysql });
          if (users) return res.json(users);
        }
        res.status(404).json({ message: 'User not found' });
      }

    static async getById (req, res) {
        const { id } = req.params
        const users = await UserModel.getById({ id })
        if (users) return res.json(users)
        res.status(404).json({message: 'User not found'})
    }

    static async create(req, res) {
        try {
            const input = req.body; 
            const newUser = await UserModel.create({ input });
    
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    
    static async delete (req, res)  {
        const { id } = req.params
    
        const result = await UserModel.delete({ id })
    
        if (result == false) {
            return res.status(404).json({ message: 'User not found' })
        }
    
        return res.json({ message: 'User deleted' })
    }

    static async update (req, res) {
        const result = validatePartialUser(req.body)
    
        if (!result.success) {
            return res.status(400).json({ error: json.parse(result.error.message) })
        }
    
        const { id } = req.params
        
        const updateUser = await UserModel.update({ id, input: result.data })
    
        return res.json(updateUser)
    }
}