import {Schema, model} from "mongoose";

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: false },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    photo: {
      type: String,
      default: true,
    }
  },
  {
    timestamps: true,
    versionKey: false// Додає createdAt та updatedAt
  },
);

export const Contact = model("Contact", contactSchema);



