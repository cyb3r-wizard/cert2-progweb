//import { users } from "../index.js";
import { validateToken } from "#repositories/users.repo.js";

export const userMiddleware = async (req, res, next) => {
  try {
    const no = { message: "Permiso Denegado >:(" };
    const tokenAuthorization = req.get("X-Authorization");
    
    const user = await validateToken(tokenAuthorization);
    console.log('user', user)
    if (!tokenAuthorization) {
      return res.status(401).json(no);
    }
    if (!user) {
      return res.status(401).json(no);
    }
    if (tokenAuthorization !== user.token) {
      return res.status(401).json(no);
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: `middleware error: ${error}` });
  }
};
