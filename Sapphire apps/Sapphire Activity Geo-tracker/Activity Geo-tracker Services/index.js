const express = require("express");
const mongoose = require("mongoose");

const UsersRouter = require("./routes/user");
const ActivitiesRouter = require("./routes/Activities");
const RequestsRouter = require("./routes/Requests");

var cors = require("cors");

const app = express();
const mongoURL = "mongodb://0.0.0.0:27017/activity-geo-tracker";
const port = process.env.PORT || 4949;

app.use(cors());
//app.use("/static", express.static("./uploads/profilePics"));
app.use(express.json());
app.use(express.urlencoded()); //for form req body

app.use("/Users", UsersRouter);
app.use("/Activities", ActivitiesRouter);
app.use("/Requests", RequestsRouter);

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to MongoDB...");
    app.listen(port, () => console.log(`Server listens on port ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });
