import { createLogger, format, transports } from "winston";
import fs from "fs";
import path from "path";

const logDir = path.resolve(process.cwd(), "log");

try {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
    console.log("Created log directory:", logDir);
  } else {
    console.log("Log directory exists:", logDir);
  }
} catch (err) {
  console.error("Error ensuring log directory exists:", err);
}

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
    new transports.File({
      filename: path.join(logDir, "info.log"),
      level: "info",
    }),
  ],
});

// if (process.env.NODE_ENV !== "production") {
//   logger.add(
//     new transports.Console({
//       format: format.combine(format.colorize(), format.simple()),
//     })
//   );
// }

const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export { logger, stream };
