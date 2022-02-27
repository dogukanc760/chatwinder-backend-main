const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndadmin,
} = require("./verifytoken");
const Gift = require("../models/Gift");


//create log
router.post("/", async (req, res) => {
   const newGift = new Gift(req.body);
   try {
       const savedGift = await newGift.save();
       res.status(201).json(savedGift);
   } catch (error) {
       res.status(500).send(error);
   }
});


router.put("/:id", async (req, res) => {
    try {
        const savedGift = await Gift.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}
        )
        res.status(201).json(savedGift);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.delete("/:id",  async (req, res) => {
    try {
      await Gift.findByIdAndDelete(req.params.id);
      res.status(200).json("Gift has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  });


//get all logs 
router.get("/", async (req, res) => {
      try {
          const Gift = await Gift.find();
          res.status(200).json(Gift);
      } catch (error) {
          res.status(500).send(error);
      }
});

router.get("/find/:id", async (req, res) => {
    try {
        const Gift = await Gift.findById(req.params.id);
        res.status(200).json(Gift);
    } catch (error) {
        res.status(500).send(error);
    }
});

//get log by log level
router.get("/get-by-type/:type", async (req, res)=>{
    try {
        const Gift = await Gift.find({
            logLevel: {$in:[req.params.type]}
        });
        console.log(req.params.type);
        res.status(200).json(Gift);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

//get log by user
router.get("/get-by-user/:type", async (req, res)=>{
    try {
        const Gift = await Gift.find({
            logUser: {$in:req.params.type}
        });
        res.status(200).json(Gift);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get log by user and type
router.get("/get-by-user-type/:userid/:type", async (req, res)=>{
    try {
        const Gift = await Gift.find({
            logUser: {$in:req.params.userid},
            logLevel:{$in:req.params.type}
        });
        res.status(200).json(Gift);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;