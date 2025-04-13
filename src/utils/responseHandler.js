export const success = (res, data = {}, message = "Success", status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const error = (res, err, status = 400) => {
  return res.status(status).json({
    success: false,
    message:
      typeof err === "string" ? err : err.message || "Something went wrong",
  });
};
