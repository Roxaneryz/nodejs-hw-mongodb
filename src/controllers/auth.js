import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
  requestResetEmail,
  resetPassword,
  loginOrRegisterWithGoogle,
} from '../services/auth.js';

import { generateAuthUrl } from '../utils/googleOAuth2.js';

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

export const requestResetEmailController = async (req, res) => {
    const { email } = req.body;

    await requestResetEmail(email);

    res.send({ status: 200, message: "Reset email was send successfully", data: {}});
};

export const requestPasswordController = async (req, res) => {
    const { password, token } = req.body;


    await resetPassword(password, token);

    res.send({ status: 200, message: "Password reset successfully", data:{} });
};



export const getOAuthURLController = async (req, res) => {
    const url = generateAuthUrl();

    res.send({
        status: 200,
        message: 'Successfully get Google OAuth URL',
        data: { url },
    });
};


export const confirmOAuthController = async (req, res) => {
    console.log("confirmOAuthController");

    const { code } = req.body;
    const session = await loginOrRegisterWithGoogle(code);
    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.send({
        status: 200, message: "Login with Google completed",
        data: {
            accessToken: session.accessToken
        }
    });
};
