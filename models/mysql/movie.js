import mysql from 'mysql2/promise';

const DEFAULT_CONFIG = {
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: '',
    database: 'pruebadb',
};
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

const pool = mysql.createPool(connectionString);

export class UserModel {
    static async getAll({ pool }) {
        try {
          const [rows, fields] = await pool.query(
            'SELECT name, dob, address, description, createdAt, BIN_TO_UUID(id) AS id FROM users;'
          );
          return rows;
        } catch (error) {
          console.error('Error al obtener todos los usuarios:', error);
          throw error;
        }
      }
  
    static async getById({ id, pool }) {
      try {
        // Implementa la lógica para obtener un usuario por ID
      } catch (error) {
        console.error('Error al obtener un usuario por ID:', error);
        throw error;
      }
    }
  
    static async create({ input, pool }) {
      try {
        // Implementa la lógica para crear un nuevo usuario
      } catch (error) {
        console.error('Error al crear un usuario:', error);
        throw error;
      }
    }
  
    static async delete({ id, pool }) {
      try {
        // Implementa la lógica para eliminar un usuario por ID
      } catch (error) {
        console.error('Error al eliminar un usuario:', error);
        throw error;
      }
    }
  
    static async update({ id, input, pool }) {
      try {
        // Implementa la lógica para actualizar un usuario por ID
      } catch (error) {
        console.error('Error al actualizar un usuario:', error);
        throw error;
      }
    }
  }
  

