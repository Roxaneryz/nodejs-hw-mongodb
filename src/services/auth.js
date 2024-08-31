import createHttpError from "http-errors";
import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } from '../constants/index.js';
//SMPT

import { Session } from "../models/session.js";
// import { sendMail } from '../utils/sendEmail.js';
// import jwt from 'jsonwebtoken';

export const registerUser = async (user) => {
    const maybeUser = await User.findOne({ email: user.email });

    if (maybeUser !== null) {
        throw createHttpError(409, "Email already in use");
    };
    user.password = await bcrypt.hash(user.password, 10);

    return User.create(user);
};

export const loginUser = async (email, password) => {
    const maybeUser = await User.findOne({ email });

    if (maybeUser === null) {
        throw createHttpError(404, "User not found");
    }

    const isMatch = await bcrypt.compare(password, maybeUser.password);

    if (isMatch === false) {
        throw createHttpError(401, "Unauthorized");
    }

    await Session.deleteOne({ userId: maybeUser._id });

    const accessToken = crypto.randomBytes(30).toString("base64");
     const refreshToken = crypto.randomBytes(30).toString('base64');

    return Session.create({
        userId: maybeUser._id,
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
        refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),

    });

}; export const logoutUser = (sessionId) => {
    return Session.deleteOne({ _id: sessionId });
};

export const refreshUserSession = async (sessionId, refreshToken) => {
    const session = await Session.findOne({ _id: sessionId, refreshToken });

    if (session === null) {
        throw createHttpError(401, "Session not found");
    }

    if (new Date() > new Date(session.refreshTokenValidUntil)) {
        throw createHttpError(401, " Refresh token is expired");
    }

    await Session.deleteOne({ _id: sessionId });

    return Session.create({
        userId: session.userId,
        accessToken: crypto.randomBytes(30).toString('base64'),
        refreshToken: crypto.randomBytes(30).toString('base64'),
        accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
        refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });

};


// export const requestResetEmail = async (email) => {
//     const user = await User.findOne({ email });
//     if (user === null) {
//         throw createHttpError(404, "User not found");
//     }

//     const resetToken = jwt.sing({
//         sub: user_id,
//         emai: user.email,
//     },
//         process.env.JWT_SECRET,
//         { expiresIn: "15m" }
//     );

//     await sendMail({
//         from: SMTP.FROM_EMAIL,
//         to: email,
//         subject: "Reset your password",
//         html,
//     });
// };