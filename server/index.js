const exp = require("express");
const app = exp();
const db = require("./models");
const cors = require("cors");
require("dotenv").config();
app.use(exp.json());
app.use(cors());
//Router
const users = require("./routes/Users");
const posts = require("./routes/Posts");
const comments = require("./routes/Comments")
const like = require("./routes/Likes");

app.use("/auth", users);
app.use("/posts", posts);
app.use("/comments", comments);
app.use("/like", like);

//running the app in 2001 port
db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 2001, () => {
    console.log("App is running!!");
  })
}).catch((err) => {
  console.log(err);
})
