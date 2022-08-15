const express = require("express");
const mongoose = require("mongoose");

// const CategoriesRouter = require("./routes/category");
const UsersRouter = require("./routes/user");
// const ProductsRouter = require("./routes/products");
const FilesRouter = require("./routes/files");
// const ShoppingCartRouter = require("./routes/shoppingcart");

var cors = require("cors");

const app = express();
const mongoURL = "mongodb://localhost:27017/cloud-store";
const port = process.env.PORT || 3000;

app.use(cors());
app.use("/static", express.static("./uploads/profilePics"));
app.use(express.json());
app.use(express.urlencoded()); //for form req body

//  app.use('/Categories', CategoriesRouter);
app.use("/Users", UsersRouter);
//  app.use('/Products', ProductsRouter);
app.use("/files", FilesRouter);
//  app.use('/ShoppingCarts',ShoppingCartRouter)

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
