import { registerUser, loginUser } from '../services/auth.js';

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


export const loginController = async (req, res) => {

    const { email, password } = req.body;
    const session = await loginUser(email, password);

    res.cookies("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.cookies("sessionId", session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.send({
        status: 200, message: "Successfully logged in!", data: { accessToken: session.accessToken },

    });
};