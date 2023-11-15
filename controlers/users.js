import { UserModel } from "../models/mysql/movie.js";
import { validateUser, validatePartialUser } from "../schemes/users.js";

export class UserController {
    static async getAll(req, res) {
        try {
            const users = await UserModel.getAll({ pool: req.mysql });
            if (users) {
                return res.json(users);
            } else {
                return res.status(404).json({ message: 'Users not found' });
            }
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    

    static async create({ input, pool }) {
        try {
          if (!input) {
            throw new Error('Input is undefined');
          }
      
          const result = await pool.query(
            'INSERT INTO user (name, dob, adress, description, createdAt) VALUES (?, ?, ?, ?, ?);',
            [input.nombre, input.dob, input.adress, input.description, input.createdAt]
          );
      
          const newUser = {
            id: result[0].insertId,
            ...input,
          };
      
          return newUser;
        } catch (error) {
          console.error('Error al crear un usuario:', error);
          throw error;
        }
      }      
    
      static async delete(req, res) {
        const { name } = req.params;
        console.log('Deleting user with name:', name);

        try {
            const result = await UserModel.deleteByName({ name, pool: req.mysql });

            if (result === false) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.json({ message: 'User deleted' });
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }    
    

    static async update(req, res) {
        const result = validatePartialUser(req.body);
    
        if (!result.success) {
            return res.status(400).json({ error: json.parse(result.error.message) });
        }
    
        const { name } = req.params;
        const pool = req.mysql;
    
        if (!pool) {
            return res.status(500).json({ error: 'Internal Server Error - Database pool not available' });
        }
    
        const updateUser = await UserModel.updateByName({ name, input: result.data, pool });
    
        return res.json(updateUser);
    }    
}