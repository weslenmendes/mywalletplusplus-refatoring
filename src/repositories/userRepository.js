import bcrypt from "bcrypt";

import connection from "../database.js";

async function getUserByEmail(email) {
  const result = await connection.query(
    `SELECT * FROM "users" WHERE "email"=$1`,
    [email],
  );
  return result;
}

async function addUser(name, email, password) {
  const hashedPassword = bcrypt.hashSync(password, 12);

  await connection.query(
    `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
    [name, email, hashedPassword],
  );
}

const userRepository = {
  getUserByEmail,
  addUser,
};

export default userRepository;
