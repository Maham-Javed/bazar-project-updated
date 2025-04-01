import stockService from "../services/stockService.js";

async function stockIn(req, res) {
  try {
    const { productId, quantity } = req.body;
    const stockMovement = await stockService.stockIn(productId, quantity);
    res.json(stockMovement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function sellProduct(req, res) {
  try {
    const { productId, quantity } = req.body;
    const stockMovement = await stockService.sellProduct(productId, quantity);
    res.json(stockMovement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

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
