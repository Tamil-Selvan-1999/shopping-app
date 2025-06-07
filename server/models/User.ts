import mongoose, { Document } from "mongoose";
import { IUser } from "../interface/interface";

interface IUserDocument extends IUser, Document {}

const UserSchema = new mongoose.Schema<IUserDocument>(
  {
    userId: { type: Number, required: true, unique: true },
    firstName: String,
    lastName: String,
    maidenName: String,
    age: Number,
    gender: { type: String, enum: ["male", "female", "other"] },
    email: { type: String, unique: true, required: true },
    phone: String,
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    birthDate: Date,
    image: String,
    bloodGroup: String,
    height: Number,
    weight: Number,
    eyeColor: String,

    hair: {
      color: String,
      type: String,
    },

    ip: String,

    address: {
      address: String,
      city: String,
      state: String,
      stateCode: String,
      postalCode: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
      country: String,
    },

    macAddress: String,
    university: String,

    bank: {
      cardExpire: String,
      cardNumber: String,
      cardType: String,
      currency: String,
      iban: String,
    },

    company: {
      department: String,
      name: String,
      title: String,
      address: {
        address: String,
        city: String,
        state: String,
        stateCode: String,
        postalCode: String,
        coordinates: {
          lat: Number,
          lng: Number,
        },
        country: String,
      },
    },

    ein: String,
    ssn: String,
    userAgent: String,

    crypto: {
      coin: String,
      wallet: String,
      network: String,
    },

    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
  },
  { collection: "users_data" }
);

const User = mongoose.model("User", UserSchema);

export default User;
