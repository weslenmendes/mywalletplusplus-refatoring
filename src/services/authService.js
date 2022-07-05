import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserRepository from "./../repositories/userRepository.js";

export async function signUp(name, email, password) {
  if (!name || !email || !password) {
    throw { error: "missingFields", message: "Missing fields on request body" };
  }

  const existingUsers = await UserRepository.getUserByEmail(email);

  if (existingUsers.rowCount > 0) {
    throw { error: "userAlreadyExists", message: "User already exists" };
  }

  await UserRepository.addUser(name, email, password);
}

export async function signIn(email, password) {
  if (!email || !password) {
    throw { error: "missingFields", message: "Missing fields on request body" };
  }

  const { rows } = await UserRepository.getUserByEmail(email);
  const [user] = rows;

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw { error: "invalidCredentials", message: "Invalid credentials" };
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET,
  );

  return { token };
}
