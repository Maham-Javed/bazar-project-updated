import { enqueueStock } from "../jobs/stockJob.js";
import { getStockReport } from "../services/stockService.js";
import { success, error } from "../utils/responseHandler.js";

// POST /api/stock
export const handleMovement = async (req, res) => {
  try {
    const { productId, storeId, type, quantity } = req.body;

    if (!productId || !storeId || !type || !quantity || quantity <= 0) {
      return error(
        res,
        "All fields are required with a positive quantity",
        400
      );
    }

    const validTypes = ["IN", "SALE", "REMOVE"];
    if (!validTypes.includes(type)) {
      return error(res, "Invalid stock movement type", 400);
    }

    await enqueueStock({ productId, storeId, type, quantity });
    success(res, { message: "Stock update enqueued" });
  } catch (err) {
    error(res, err.message);
  }
};

// GET /api/stock/report?storeId=1&startDate=...&endDate=...
export const getReport = async (req, res) => {
  const { storeId, startDate, endDate } = req.query;
  try {
    if (
      (startDate && isNaN(Date.parse(startDate))) ||
      (endDate && isNaN(Date.parse(endDate)))
    ) {
      return error(res, "Invalid date format", 400);
    }

    const report = await getStockReport(storeId, startDate, endDate);
    success(res, report);
  } catch (err) {
    error(res, err.message);
  }
};
