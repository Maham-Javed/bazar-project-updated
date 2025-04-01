import express from "express";
import bodyParser from "body-parser";
import productRoutes from "./routes/productRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import sequelize from "./config/database.js";

const app = express();
app.use(bodyParser.json());

app.use("/products", productRoutes);
app.use("/stock", stockRoutes);

sequelize
  .sync({ force: true }) // WARNING: This deletes existing data!
  .then(() => console.log("Database synced!"))
  .catch((err) => console.error("Sync error:", err));

app.listen(5000, () => console.log("Server running on port 5000"));
