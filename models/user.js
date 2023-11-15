
export class UserModel {
  static async getAll() {
    try {
      const result = await db.execute('SELECT * FROM users');
      return result.rows;
    } catch (error) {
      console.error('Error al obtener todos los usuarios desde Turso:', error);
      throw error;
    }
  }

  static async getById({ id, res }) {
    try {
        if (!id) {
            return res.status(400).json({ error: 'El parámetro "id" es obligatorio' });
        }

        const user = await this.getAll();
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.json(user);
    } catch (error) {
        console.error('Error al obtener un usuario por ID:', error);
        if (res) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        throw error;
    }
}

  static async create({ input }) {
    try {
        const { nombre, dob, address, description, createdAt } = input;

        const result = await db.execute(
            `INSERT INTO users (nombre, dob, address, description, createdAt)
              VALUES ($1, $2, $3, $4, $5)
              RETURNING *`,
            [nombre, dob, address, description, createdAt]
        );        

        console.log(result);

        return result.rows[0];
    } catch (error) {
        console.error('Error al crear un usuario:', error);
        throw error;
    }
}


  static async delete({ id }) {
    const result = await db.execute('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return result.rows.length > 0;
  }

  static async update({ id, input }) {
    const result = await db.execute(
      'UPDATE users SET dob = $1 WHERE id = $2 RETURNING *',
      [input.dob, id]
    );
    return result.rows[0];
  }
}
