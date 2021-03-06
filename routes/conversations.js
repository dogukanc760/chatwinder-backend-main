const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conv

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});


//delete conv 
router.put("/delete-conv/:id", async (req, res) => {
try {
   const findConversation = await Conversation.findOne({_id: {$in:req.params.id}});
   findConversation.status = false; 
   const updateConversation =await Conversation.findByIdAndUpdate(
     req.params.id,
     {
       $set:findConversation
     },{new:true}
   );
   res.status(200).json(updateConversation);
} catch (error) {
  res.status(500).json(error);
}
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/check/:firstId/:secondId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
      status:{$in:true}
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      status:{$in:true}
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
