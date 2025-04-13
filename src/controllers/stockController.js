import stockService from "../services/stockService.js";

// Validate incoming data
const validateStockMovement = (productId, quantity) => {
  if (!productId || quantity <= 0) {
    throw new Error("Invalid productId or quantity");
  }
};

// Handle stock in movements
async function stockIn(req, res) {
  try {
    const { productId, quantity } = req.body;

    // Validate inputs
    validateStockMovement(productId, quantity);

    const stockMovement = await stockService.stockIn(productId, quantity);
    res.json({ message: "Stock added successfully", stockMovement });
  } catch (error) {
    console.error("Error in stockIn:", error);
    if (error.message.includes("Product not found")) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(400).json({ error: error.message });
  }
}

// Handle product sales and stock updates
async function sellProduct(req, res) {
  try {
    const { productId, quantity } = req.body;

    // Validate inputs
    validateStockMovement(productId, quantity);

    const stockMovement = await stockService.sellProduct(productId, quantity);
    res.json({ message: "Product sold successfully", stockMovement });
  } catch (error) {
    console.error("Error in sellProduct:", error);
    if (error.message.includes("Insufficient stock")) {
      return res.status(400).json({ error: "Insufficient stock available" });
    }
    res.status(400).json({ error: error.message });
  }
}

// Handle stock report generation
async function getReport(req, res) {
  const { storeId, startDate, endDate } = req.query;
  try {
    const report = await getStockReport(storeId, startDate, endDate);
    success(res, report);
  } catch (err) {
    error(res, err.message);
  }
}

// Handle removing stock
async function removeStock(req, res) {
  try {
    const { productId, quantity } = req.body;

    // Validate inputs
    validateStockMovement(productId, quantity);

    const stockMovement = await stockService.removeStock(productId, quantity);
    res.json({ message: "Stock removed successfully", stockMovement });
  } catch (error) {
    console.error("Error in removeStock:", error);
    if (error.message.includes("Product not found")) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(400).json({ error: error.message });
  }
}

export { stockIn, sellProduct, getReport, removeStock };
