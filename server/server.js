// Import Express
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connection");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Create an instance of express
const app = express();
dotenv.config();
connectDB();

app.use(express.json());


app.get("/", (req, res) => {
  res.send("API running successfully!");
});

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(console.log(`Server running on port ${PORT}`));
