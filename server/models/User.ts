import mongoose, { CallbackError, Document } from "mongoose";
import { IUser } from "../interface/interface";
import Counter from "./counter.model";

interface IUserDocument extends IUser, Document {}

const UserSchema = new mongoose.Schema<IUserDocument>(
  {
    userId: { $type: Number, unique: true },
    firstName: String,
    lastName: String,
    maidenName: String,
    age: Number,
    gender: { $type: String, enum: ["male", "female", "other"] },
    email: { $type: String, unique: true, required: true },
    phone: String,
    username: { $type: String, unique: true, required: true },
    password: { $type: String, required: true },
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
      $type: String,
      enum: ["user", "admin", "moderator", "customer"],
      default: "user",
    },
  },
  { collection: "users_data", typeKey: "$type" }
);

UserSchema.pre("save", async function (next) {
  const doc = this as IUserDocument;

  if (!doc.isNew) return next();

  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "userId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    doc.userId = counter!.sequence_value;
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

const User = mongoose.model("User", UserSchema);

export default User;
