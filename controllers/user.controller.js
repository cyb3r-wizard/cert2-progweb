import { login, logout } from "#repositories/users.repo.js";
import { toValidateUser } from "#utils/validations.js"
import { ValiError } from "valibot";

const userPost = async (req, res) => {
  try {
    //const slayer = toValidateUser(req.body);
    const { password, username } = req.body;
    let user = await login(username, password);
    return res.status(200).json(user);
  } catch (err) {
    if(err instanceof ValiError){
      res.status(400).json({ message:  err?.issues?.map(issue => issue.message) });
    }
    return res.status(err.status || 500).json({ message: err.message });
  }
}

const userLogout = async (req,res) =>{
  try{
    const tokenAuthorization = req.get("X-Authorization");
    const logoutOk = await logout(tokenAuthorization);
    if(logoutOk){
      return res.status(204).send();
    }
    return res.status(401).json({ message: "Logout fallido o token no válido." });
  }catch(error){
    return res.status(error.status || 500).json({ message: error.message });
  }
}

export { userPost, userLogout }