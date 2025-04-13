import { enqueueStock } from "../jobs/stockJob.js";
import { getStockReport } from "../services/stockService.js";
import { success, error } from "../utils/responseHandler.js";

export const handleMovement = async (req, res) => {
  try {
    await enqueueStock(req.body);
    success(res, { message: "Stock update enqueued" });
  } catch (err) {
    error(res, err.message);
  }
};

export const getReport = async (req, res) => {
  const { storeId, startDate, endDate } = req.query;
  try {
    const report = await getStockReport(storeId, startDate, endDate);
    success(res, report);
  } catch (err) {
    error(res, err.message);
  }
};
