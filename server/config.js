const dotenv = require("dotenv");

const results = dotenv.config();

const { parsed: envs } = results;

module.exports = envs;
