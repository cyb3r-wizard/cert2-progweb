import { login } from "#repositories/users.repo.js";

const userPost = async (req,res) => {
  try{
    const { password, username } = req.body;
    let user = await login(username,password);
    return res.status(200).json(user);
  }catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
}

  export { userPost }