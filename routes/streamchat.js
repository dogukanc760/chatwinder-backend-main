const app = require('express');
const server = require('http').createServer(app)
const router = require("express").Router();
const io = require('socket.io')(server)
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndadmin,
} = require("./verifytoken");
const Messages = require("../models/Messages");


//create messages lobby 
router.post('/createLobby', async (req, res) => {
    try {
        io.on('connection', () =>{
            // client.join(req.body.socketIdSender+req.body.socketIdReciever,()=>{
            //     let rooms = Object.keys(client.rooms);
            //     console.log(rooms);
            // });
            client.to(req.body.socketIdReciever).emit(req.body.messageContent);
        });
        const newMessages = new Messages(req.body);
        const savedMessages = await newMessages.save();
        res.status(201).json("Mesaj Gönderildi! " + savedMessages);
    } catch (error) {
        res.status(500).json(error);
    }
   
});

module.exports = router;