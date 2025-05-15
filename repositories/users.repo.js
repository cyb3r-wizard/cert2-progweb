import { client } from "#prisma/client.js";
import crypto, { randomBytes } from "node:crypto";


async function validateToken(token){
  let usr = await client.user.findUnique( { where:{token:token} } )
  return usr
}

async function createToken(id) {
  let token = randomBytes(48).toString("hex");
  let res = await client.user.update( { where:{id:id},data:{token:token}});
  return res.token;
}

async function login(username, password) {
  if (!username || !password) {
    const err = new Error("Formato de petición incorrecto");
    err.status = 400;
    throw err;
  }
  
  let usr = await client.user.findUnique( { where:{username:username} } )
  if (!usr) {
    const err = new Error("Credenciales inválidas. Usuario No Pillado");
    err.status = 401;
    throw err;
  }

  const [salt, hash] = usr.password.split(":");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  if (derivedKey.toString("hex") !== hash) {
    const err = new Error("Credenciales inválidas. Usuario No Pillado");
    err.status = 401;
    throw err;
  }
  
  let token = await createToken(usr.id);

  return {
    username: usr.username,
    name: usr.name,
    token: token,
  };
}

async function logout(id) {
  if (!id) {
    const err = new Error("ID no proporcionado");
    err.status = 404;
    throw err;
  }
  await client.user.update({
    where: { id: id },
    data: { token: null }
  });
  return true;
}



export { login,validateToken, logout } 