

import mongoose, { Schema, model } from "mongoose";

const sessionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  accessToken: {
    type: String,
    required: true,
  },

  refreshToken: {
    type: String,
    required: true,
  },

  accessTokenValidUntil: {
    type: Date,
    required: true,
  },

  refreshTokenValidUntil: {
    type: Date,
    required: true,
  },
},
{versionKey: false,
    timestamps: true,}

);

export const Session = model("Session", sessionSchema);