import { registerUser, loginUser,logoutUser, refreshUserSession } from '../services/auth.js';

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

    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.send({
        status: 200, message: "Successfully logged in!", data: { accessToken: session.accessToken },

    });
};

export const logoutController = async (req, res) => {
    const { sessionId } = req.cookies;

    if (typeof sessionId === "string") {
        await logoutUser(sessionId);
    };

    res.clearCookie("refreshToken");
    res.clearCookie("sessionId");

    res.status(204).end();
};

export const refreshController = async (req, res) => {
    const { sessionId, refreshToken } = req.cookies;
    const session = await refreshUserSession(sessionId, refreshToken);

    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.send({
        status: 200, message: "Refresh completed",
        data: {
            accessToken: session.accessToken,
        }
    });


};

