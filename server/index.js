const exp = require("express");
const app = exp();
const db = require("./models"); //database connections
const cors = require("cors");
require("dotenv").config();
app.use(exp.json());
app.use(cors());
//Router
const users = require("./routes/Users");
const posts= require("./routes/Posts");
const comments = require("./routes/Comments")
app.use("/auth", users);
app.use("/posts",posts);
app.use("/comments",comments);

//running the app in 2001 port
db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 2001, () => {
    console.log("App is running!!");
  })
});
