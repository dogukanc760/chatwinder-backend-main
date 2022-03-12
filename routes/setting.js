const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndadmin,
} = require("./verifytoken");
const Setting = require("../models/Setting");


//create log
router.post("/", async (req, res) => {
   const newSetting = new Setting(req.body);
   try {
       const savedSetting = await newSetting.save();
       res.status(201).json(savedSetting);
   } catch (error) {
       res.status(500).send(error);
   }
});


router.put("/:id", async (req, res) => {
    try {
        const savedSetting = await Setting.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}
        )
        res.status(201).json(savedSetting);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.delete("/:id",  async (req, res) => {
    try {
      await Setting.findByIdAndDelete(req.params.id);
      res.status(200).json("Setting has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  });


//get all logs 
router.get("/", async (req, res) => {
      try {
          const Setting = await Setting.find();
          res.status(200).json(Setting);
      } catch (error) {
          res.status(500).send(error);
      }
});

router.get("/find/:id", async (req, res) => {
    try {
        const Setting = await Setting.findById(req.params.id);
        res.status(200).json(Setting);
    } catch (error) {
        res.status(500).send(error);
    }
});

//get log by log level
router.get("/get-by-type/:type", async (req, res)=>{
    try {
        const Setting = await Setting.find({
            logLevel: {$in:[req.params.type]}
        });
        console.log(req.params.type);
        res.status(200).json(Setting);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

//get log by user
router.get("/get-by-user/:type", async (req, res)=>{
    try {
        const Setting = await Setting.find({
            logUser: {$in:req.params.type}
        });
        res.status(200).json(Setting);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get log by user and type
router.get("/get-by-user-type/:userid/:type", async (req, res)=>{
    try {
        const Setting = await Setting.find({
            logUser: {$in:req.params.userid},
            logLevel:{$in:req.params.type}
        });
        res.status(200).json(Setting);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;