const router = require("express").Router();
const Message = require("../models/Message");

//add

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json({data: messages, message:"Success"});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:conversationId", async (req, res) => {
  try {
    const messages =  Message.find({conversationId:{$regex:req.params.conversationId}});
    const result = await Message.deleteMany(messages);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
