const dotenv = require("dotenv");

const results = dotenv.config();

const { parsed: envs } = results;

export default envs;
