require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const fighterRoute = require("./routes/fighterRoutes");
const gymRoute = require("./routes/gymRoutes");

const app = express();
app.use(express.json())

connectDB();

app.use("/api/fighters", fighterRoute);
app.use("/api/gyms", gymRoute);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
