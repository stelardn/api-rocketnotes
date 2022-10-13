const { hash, compare } = require("bcrypt");
const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");
const { request } = require("express");

class UsersController {

  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if (checkUserExists) {
      throw new AppError('Este email já está em uso!');
    }

    const hashedPassword = await hash(password, 8);

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

    if (!user) {
      throw new AppError('Usuário não encontrado!');
    };

    const userWithThisEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if (userWithThisEmail && userWithThisEmail.id !== user.id) {
      throw new AppError('Este e-mail já está em uso.');
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError('Você precisa informar a senha antiga para definir a nova senha.')
    }

    if (password && old_password) {
      const correctOldPassword = await compare(old_password, user.password);

      if (!correctOldPassword) {
        throw new AppError('A senha antiga informada não confere.');
      }

      user.password = await hash(password, 8);
    }

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    );

    return response.json();

  }


}

module.exports = UsersController;