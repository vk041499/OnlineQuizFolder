const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());

const dbConfig = require("./config/dbConfig");

const usersRoute = require("./routes/userRoute");
const examsRoute = require("./routes/examsRoute");
const reportsRoute = require("./routes/reportsRoute")

app.use("/api/users", usersRoute);
app.use("/api/exams", examsRoute);
app.use("/api/reports", reportsRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
