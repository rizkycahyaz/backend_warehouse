const express = require("express");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");
const locationRoutes = require("./routes/locationRoutes");
const errorHandler = require("./middlewares/errorHandler");
const { addLocationValidator } = require("./validators/locationValidator");
const authMiddleware = require("./middlewares/authMiddleware");
const path = require("path");
const port = 3000;

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/static", express.static(path.join(__dirname, "public/images")));

// Routes
app.use("/api/item", authMiddleware, addLocationValidator, locationRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/auth", authRoutes);

const itemRoutes = require("./routes/itemRoutes");
app.use("/api/items", itemRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
