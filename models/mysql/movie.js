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
            'SELECT name, dob, adress, description, createdAt, BIN_TO_UUID(id) AS id FROM user;'
          );
          return rows;
        } catch (error) {
          console.error('Error al obtener todos los usuarios:', error);
          throw error;
        }
      }  
  
      static async create({ input, pool }) {
        try {
          const result = await pool.query(
            "INSERT INTO user (id, name, dob, adress, description, createdAt) VALUES (UUID_TO_BIN(UUID()), ?, ?, ?, ?, ?);",
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
      
  
      static async deleteByName({ name, pool }) {
        try {
            if (!pool) {
                throw new Error('Database pool is undefined');
            }
    
            const result = await pool.query(
                'DELETE FROM user WHERE name = ?;',
                [name]
            );
    
            if (result[0].affectedRows === 0) {
                return false;
            }
    
            return true;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }          
      
    static async updateByName({ name, input, pool }) {
      try {
          if (!pool) {
              throw new Error('Database pool is undefined');
          }
  
          const setClause = Object.keys(input)
              .map(key => `${key} = ?`)
              .join(', ');
  
          const values = Object.values(input);
  
          values.push(name);
  
          const result = await pool.query(
              `UPDATE user SET ${setClause} WHERE name = ?;`,
              values
          );
  
          if (result[0].affectedRows === 0) {
              return false;
          }
  
          const updatedUser = await pool.query(
              'SELECT name, dob, adress, description, createdAt, BIN_TO_UUID(id) AS id FROM user WHERE name = ?;',
              [name]
          );
  
          return updatedUser[0][0];
      } catch (error) {
          console.error('Error updating user by name:', error);
          throw error;
      }
  }
      
  }
