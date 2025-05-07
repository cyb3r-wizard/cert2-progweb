import { users } from "../index.js";

export const userMiddleware = (req, res, next) => {
  try {
    const no = { message: "Permiso Denegado >:(" };
    const tokenAuthorization = req.get("X-Authorization");
    const user = users.find((user) => user.token === tokenAuthorization);
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
