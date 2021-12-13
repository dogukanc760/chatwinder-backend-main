const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndadmin,
} = require("./verifytoken");
const Notifications = require("../models/Notification");


//get all notification
router.get("/", async (req, res) => {
   try {
       const notification = await Notifications.find();
       res.status(200).json(notification);
   } catch (error) {
       res.status(500).json(error);
   }
});

//get one notification
router.get("/:id", async (req, res) => {
   try {
       const notification = await Notifications.findOne({id: req.params.id});
       res.status(200).json(notification);
   } catch (error) {
       res.status(500).json(error);
   }
});

//create notification
router.post("/", async (req, res) => {
  const newNotification = new Notifications(req.body);

  try {
      const savedNotification = await newNotification.save();
      res.status(201).json(savedNotification);
  } catch (error) {
      res.status(500).json(error);
  }
});

//update notification
router.put("/:id", async (req, res) => {
    try {
        const updatedNotification = await Notification.findByIdAndUpdate(
            req.params.id,
            {
                $set:red.body,
            },
            {new:true}
        );
        res.status(201).json(updatedNotification);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Notification Delete
router.delete("/:id", async (req, res)=>{
   try {
       await Notification.findByIdAndDelete(req.params.id);
       res.status(200).json("Notification has been deleted!");
   } catch (error) {
       res.status(500).json(error);
   }
});

module.exports = router;