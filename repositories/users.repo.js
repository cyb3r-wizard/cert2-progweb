import { users } from "#index.js";
import crypto, { randomBytes } from "node:crypto";
async function login(username,password){
      let user = users.find((user) => user.username === username);
      if (!user) {
        return null;
      }

      const [salt, hash] = user.password.split(":");
      const derivedKey = crypto.scryptSync(password, salt, 64);
      
      if (derivedKey.toString("hex") !== hash) {
        return null
      }
      
      let token = randomBytes(48).toString("hex");
      user.token = token;
      return user;
}

export { login }