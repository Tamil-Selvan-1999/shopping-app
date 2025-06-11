import express, { Request, Response, Router } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../config";
import { logger } from "../logger";
import verifyToken from "../middleware/authMiddleware";
import { faker } from "@faker-js/faker";

const JWT_SECRET_KEY = env.JWT_SECRET_KEY;

const auth_router: Router = express.Router();

auth_router.post(
  "/login",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .send({ status: "fail", msg: "Invalid data", data: {} });
      }

      const data = await User.findOne({ username });

      if (!data) {
        return res
          .status(404)
          .send({ status: "fail", msg: "User not found", data: {} });
      }

      const pwdMatch = await bcrypt.compare(password, data.password);

      if (!pwdMatch) {
        return res
          .status(401)
          .send({ status: "fail", msg: "Incorrect Credenrials", data: {} });
      }

      const token = jwt.sign({ userId: data._id }, JWT_SECRET_KEY as any, {
        expiresIn: "1h",
      });

      return res.status(200).send({
        status: "success",
        msg: "Login success",
        data: { token },
      });
    } catch (error: any) {
      logger.error(error);
      return res
        .status(500)
        .send({ status: "fail", msg: "Internal Server Error", data: {} });
    }
  }
);

auth_router.post(
  "/register",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { username, password, firstName, lastName } = req.body;
      if (!username || !password || !firstName || !lastName) {
        return res
          .status(400)
          .send({ status: "fail", msg: "Incorrect data", data: {} });
      }
      const data = await User.findOne({ username });
      if (data) {
        return res
          .status(400)
          .send({ status: "fail", msg: "User Already present", data: {} });
      }
      const hash_pwd = await bcrypt.hash(password, 10);
      await User.create({
        username: username,
        password: hash_pwd,
        firstName: firstName,
        lastName: lastName,
        role: "customer",
        age: faker.number.int({ min: 18, max: 60 }),
        email: faker.internet.email(),
        phone: `+${faker.number.int({
          min: 1,
          max: 998,
        })} ${faker.string.numeric(3)}-${faker.string.numeric(
          3
        )}-${faker.string.numeric(4)}`,
        gender: faker.helpers.arrayElement(["male", "female"]),
        birthDate: faker.date.birthdate({ mode: "age", min: 18, max: 60 }),
        image: faker.image.avatar(),
        bloodGroup: faker.helpers.arrayElement(["A+", "B+", "O-", "AB+"]),
        height: faker.number.float({ min: 150, max: 200 }),
        weight: faker.number.float({ min: 45, max: 100 }),
        eyeColor: faker.color.human(),
        hair: {
          color: faker.color.human(),
          type: faker.helpers.arrayElement(["Straight", "Curly", "Wavy"]),
        },
        ip: faker.internet.ip(),
        macAddress: faker.internet.mac(),
        university: faker.company.name(),
        address: {
          address: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          stateCode: faker.location.state({ abbreviated: true }),
          postalCode: faker.location.zipCode(),
          coordinates: {
            lat: Number(faker.location.latitude()),
            lng: Number(faker.location.longitude()),
          },
          country: faker.location.country(),
        },
        bank: {
          cardExpire: `${faker.number
            .int({ min: 1, max: 12 })
            .toString()
            .padStart(2, "0")}/${(
            new Date().getFullYear() + faker.number.int({ min: 1, max: 5 })
          )
            .toString()
            .slice(-2)}`,
          cardNumber: faker.finance.creditCardNumber(),
          cardType: faker.finance.creditCardIssuer(),
          currency: "USD",
          iban: faker.finance.iban(),
        },
        company: {
          department: faker.commerce.department(),
          name: faker.company.name(),
          title: faker.person.jobTitle(),
          address: {
            address: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            stateCode: faker.location.state({ abbreviated: true }),
            postalCode: faker.location.zipCode(),
            coordinates: {
              lat: Number(faker.location.latitude()),
              lng: Number(faker.location.longitude()),
            },
            country: faker.location.country(),
          },
        },
        ein: faker.finance.accountNumber(9),
        ssn: faker.number.int({ min: 100000000, max: 999999999 }).toString(),
        userAgent: faker.internet.userAgent(),
        crypto: {
          coin: "Bitcoin",
          wallet: faker.finance.ethereumAddress(),
          network: "Ethereum (ERC20)",
        },
      });
      return res
        .status(201)
        .send({ status: "success", msg: "Registered successfully", data: {} });
    } catch (error) {
      return res
        .status(500)
        .send({ status: "fail", msg: "Internal Server Error", data: {} });
    }
  }
);

auth_router.get(
  "/profile",
  verifyToken,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const id = req.user_id;
      const user = await User.findById(id);
      return res.status(200).send({
        status: "success",
        msg: "Success",
        data: {
          firstName: user?.firstName,
          lastName: user?.lastName,
          role: user?.role,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .send({ status: "fail", msg: "Internal server error", data: {} });
    }
  }
);

export default auth_router;
