require("dotenv").config();
const express = require("express");
var cors = require("cors");
const connectDb = require("./config/dbConn");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
connectDb();
app.use(express.json());
require("./models/user");
require("./models/post");

app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
