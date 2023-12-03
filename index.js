const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const port = process.env.PORT || 3001;
const path = require("path");
const getRoutes = require("./routes/getRoutes");
const postRoutes = require("./routes/postRoutes");
const putRoutes = require("./routes/putRoutes");
const deleteRoutes = require("./routes/deleteRoutes");
const data = require("./heliverse_mock_data.json");
//middlerwere
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
//mongose
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@ocircleo.zgezjlp.mongodb.net/heliverse?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});
//Jwt token request
app.post("/jwt", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCES_TOKEN_SECRET, {
    expiresIn: "24h",
  });
  res.send({ token });
});
app.get("/test", (req, res) => {
  const length = data.length;
  const resultall = {};
  async function seeDataCatgory(num) {
    if (num == length) return res.send(resultall);
    if (num < length) {
      let domain = data[num].gender;
      if (resultall[domain]) {
        resultall[domain];
        resultall[domain]++;
      } else {
        resultall[domain] = 1;
      }
      // console.log(resultall);
      await seeDataCatgory(num + 1);
    }
  }
  seeDataCatgory(0);
});
//Routes
app.use("/api/get", getRoutes);
app.use("/api/post", postRoutes);
app.use("/api/put", putRoutes);
app.use("/api/delete", deleteRoutes);
//listen to app
app.use((req, res) => {
  res.send("<h1>404</h1>");
});
app.listen(port, async () => {
  console.log(`APP IS RUNNIGN AT PORT http://localhost:${port}`);
});
