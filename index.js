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
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid')
var cors = require("cors")

dotenv.config();
app.set('view engine', 'ejs')
app.use(express.static('public'))
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connection successfully"))
  .catch((err) => {
    console.log(err);
  });
 

app.get('/', (req, res) => {
  res.status(200).send("Working!");
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

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


app.listen(process.env.PORT || 3000, () => {
  console.log("server running");
});
