const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const imageRoute = require("./routes/image");
const streamParamsRoute = require("./routes/streamparams");
const advertRoute = require("./routes/advert");
const notificationRoute = require("./routes/notification");
const streamChatRoute = require("./routes/streamchat");
const loggerRoute = require("./routes/logger");
const uploadRoute = require("./routes/uploadimage");
const conversationsRoute = require("./routes/conversations");
const messagesRoute = require("./routes/messages");
const giftRoute = require("./routes/gift");
const settingRoute = require("./routes/setting");
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid')
var cors = require("cors")
const path = require("path");

dotenv.config();
app.set('view engine', 'ejs')

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connection successfully"))
  .catch((err) => {
    console.log(err);
  });
 

app.get('/', (req, res) => {
  res.status(200).send("Working!");
})
app.use("/images", express.static(path.join(__dirname, "routes/images")));
app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    console.log(user);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});


//   var whiteList = ['http://localhost:5500', 'http://localhost:5000', 'http://localhost:4200'];
//   var corsOptions = {
//     origin: (origin, callback) => {
//          if (whiteList.indexOf(origin) !== -1)
//               callback(null, true);
//          else
//               callback(new Error("! ! !"));
//     }
// }
  app.use(cors());
  app.use(express.json());
  app.options('*', cors());
  
  app.use("/api/product", productRoute);
  app.use("/api/uploadImage", uploadRoute);
 app.use("/api/user", userRoute);
 app.use("/api/auth", authRoute);
 app.use("/api/order", orderRoute);
 app.use("/api/cart", cartRoute);
 app.use("/api/image", imageRoute);
 app.use("/api/streamparams", streamParamsRoute);
 app.use("/api/advert", advertRoute);
 app.use("/api/notification", notificationRoute);
 app.use("/api/streamchat", streamChatRoute);
 app.use("/api/logger", loggerRoute);
 app.use("/api/conversation", conversationsRoute);
 app.use("/api/messages", messagesRoute);
 app.use("/api/gift", giftRoute);
 app.use("/api/setting", settingRoute);


app.listen(process.env.PORT || 3000, () => {
  console.log("server running");
});
