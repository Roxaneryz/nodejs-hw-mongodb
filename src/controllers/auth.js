import { registerUser,  } from '../services/auth.js';

// loginUser;

export const registerController = async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

    const registeredUser = await registerUser(user);

    res.send({ status: 200, message: "User successfully registered", data: registeredUser });
};