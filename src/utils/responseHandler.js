import winston from "winston"; // For logging (optional, can be replaced with any other logger)

// Logger setup (simple example)
const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: "error.log" }),
  ],
});

export const success = (res, data = {}, message = "Success", status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const error = (res, err, status = 400) => {
  // Log the error for debugging purposes (can be replaced with your own logger)
  logger.error(err);

  // Check if error is an instance of Error
  const errorMessage =
    err instanceof Error ? err.message : "Something went wrong";
  const errorStack = process.env.NODE_ENV === "production" ? null : err.stack;

  return res.status(status).json({
    success: false,
    message: errorMessage,
    details: errorStack, // Include stack trace for debugging in dev mode
  });
};
