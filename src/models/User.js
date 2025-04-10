import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Make sure `id` is the primary key
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 255], // Password must be at least 8 characters long
    },
  },
});

// Hook to hash password before storing it in the database
// User.beforeCreate(async (user) => {
//   user.password = await bcrypt.hash(user.password, 10);
// });

export default User;
