const sqlite3 = require('sqlite3'); // driver que conecta com a base de dados
const sqlite = require('sqlite'); // responsável pela conexão
const path = require("path");

// função assíncrona = app criará um baco de dados ao ser inicializado, caso não exista
async function sqliteConnection() {
  const database = await sqlite.open({
    // filename: "../../database" pode dar problemas em outros OS
    // dirname: pasta atual
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database
  });

  return database;
}

module.exports = sqliteConnection;