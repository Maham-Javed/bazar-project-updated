import stockService from "../services/stockService.js";

// This controller handles stock movements such as stock in, selling products, and removing stock.

//  This controller handles stock in movements and updates stock accordingly.
async function stockIn(req, res) {
  try {
    const { productId, quantity } = req.body;
    const stockMovement = await stockService.stockIn(productId, quantity);
    res.json(stockMovement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// This controller handles selling products and updating stock accordingly.
async function sellProduct(req, res) {
  try {
    const { productId, quantity } = req.body;
    const stockMovement = await stockService.sellProduct(productId, quantity);
    res.json(stockMovement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// This controller handles removing stock and updating stock accordingly.
async function removeStock(req, res) {
  try {
    const { productId, quantity } = req.body;
    const stockMovement = await stockService.removeStock(productId, quantity);
    res.json(stockMovement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export { stockIn, sellProduct, removeStock };
