import createHttpError from "http-errors";
import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import {
  ACCESS_TOKEN_TTL,
  REFRESH_TOKEN_TTL,
  SMPT,
} from '../constants/index.js';


import { Session } from "../models/session.js";
import { sendMail } from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';
import fs from 'node:fs';
import handlebars from 'handlebars';

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


export const requestResetEmail = async (email) => {
    const user = await User.findOne({ email });
    if (user === null) {
        throw createHttpError(404, "User not found");
    }

    const resetToken = jwt.sing({
        sub: user_id,
        email: user.email,
    },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );


    const templateSource = fs.readFileSync(path.resolve("src/template/reset-path.hbs"), { encoding: "UTF-8" },);
    const template = handlebars.compile(templateSource);
    const html = template({ name: user.name, resetToken });

    try {

        await sendMail({
            from: SMTP.FROM_EMAIL,
            to: email,
            subject: "Reset your password",
            html,
        });
    } catch {
        throw createHttpError(500, "Cannot send email");
    }
    };

export const resetPassword = async (password, token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id, decoded.sub, email: decoded.email });


        if (user === null) {
            throw createHttpError(404, "User not found");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate({ _id: user._id },
            {password: hashedPassword},
        )


    } catch (error) {
        if(
            error.name === "TokenExpiredError" ||
            error.name === "JsonWebTokenError"
        )
        {
            throw createHttpError(401, "Token error");
        }
        throw error;
    }


};