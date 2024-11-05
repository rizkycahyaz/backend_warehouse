const express = require("express");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");
const locationRoutes = require("./routes/locationRoutes");
const itemRoutes = require("./routes/itemRoutes");
const errorHandler = require("./middlewares/errorHandler");
const { addLocationValidator } = require("./validators/locationValidator");
const path = require("path");
const port = 3000;

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/static", express.static(path.join(__dirname, "public/images")));

// Routes
// Routes
app.use("/api/auth", authRoutes); // Pastikan authRoutes tidak membutuhkan authMiddleware
// Halaman utama tidak butuh middleware otentikasi
app.use("/api/items", itemRoutes); 
// Hanya halaman admin yang butuh middleware otentikasi
app.use("/api/admin/items", itemRoutes);
app.use("/api/locations", locationRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
