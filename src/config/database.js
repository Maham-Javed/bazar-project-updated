import { Sequelize } from "sequelize";

// SQLite database connection
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: `./database.sqlite`,
  logging: false,
});

// Test connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.error("DB Connection Error:", err));

export default sequelize;
