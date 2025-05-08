import { users } from "#index.js";
import crypto, { randomBytes } from "node:crypto";
async function login(username, password) {
  if (!username || !password) {
    const err = new Error("Formato de petición incorrecto");
    err.status = 400;
    throw err;
  }
  let user = users.find((user) => user.username === username);
  if (!user) {
    const err = new Error("Credenciales inválidas. Usuario No Pillado");
    err.status = 401;
    throw err;
  }
  const [salt, hash] = user.password.split(":");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  if (derivedKey.toString("hex") !== hash) {
    const err = new Error("Credenciales inválidas. Usuario No Pillado");
    err.status = 401;
    throw err;
  }
  let token = randomBytes(48).toString("hex");
  user.token = token;
  return {
    username: user.username,
    name: user.name,
    token: user.token,
  };
}

export { login } 