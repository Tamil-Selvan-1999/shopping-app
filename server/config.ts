import dotenv from "dotenv";

const result = dotenv.config();

const envs = result.parsed as Record<string, string>;

export default envs;
