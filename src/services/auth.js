import createHttpError from "http-errors";
import { User } from "../models/user.js";
import bcrypt from 'bcrypt';

export const registerUser = async (user) => {
    const maybeUser = await User.findOne({ email: user.email });

    if (!maybeUser) {
        throw createHttpError(409, "Email already in use");
    };
    user.password = await bcrypt.has(user.password, 10);

    return User.create(user);
};