const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || process.env.DEV_PORT;

app.use(cors());
app.use(express.json());
app.use("/public", express.static("public"));

mongoose.connect(process.env.MONGODB_URI || MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Routes
const photoshootsRoutes = require("./routes/photoshoots.routes");
const userdetailsRoutes = require("./routes/userdetails.routes");
const imagesRoutes = require("./routes/images.routes");
const messagesRoutes = require("./routes/messages.routes");

app.use("/photoshoots", photoshootsRoutes);
app.use("/userdetails", userdetailsRoutes);
app.use("/images", imagesRoutes);
app.use("/messages", messagesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});

app.listen(PORT, (req, res) => {
  console.log("Server is running " + process.env.DEV_PORT);
});
