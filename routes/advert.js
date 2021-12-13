const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndadmin,
} = require("./verifytoken");
const Advert = require("../models/Advert");
const Logger = require("../models/Logger");

//set log for buy advert
router.post("/buy-advert", async (req, res)=>{
    const newLogger = new Logger(req.body);
    try {
        const savedLogger = await newLogger.save();
    } catch (error) {
        res.status(500).send(error);
    }
});

//create one advert 
router.post("/create-advert", async (req, res)=>{
    const newAdvert = new Advert(req.body);
    try {
        const savedAdvert = await newAdvert.save();
        console.log(req.body.name+" created advert");
        res.status(200).json(savedAdvert);
    } catch (error) {
        res.status(500).json(error);
    }
});


//get all 
router.get("/", async (req, res) => {
    try {
        const advert = await Advert.find();
        res.status(200).json(advert);
    } catch (error) {
        res.status(500).json(error);
    } 
});

//getl all adver by user 
router.get("/getall/:id", async (req, res) => {
    try {
        //var finalId = req.params.user_id.toString();
        console.log(req.params.id);
        const users = await Advert.find({
          user_id: {$in:req.params.id}
        });
          // ? await User.find().sort({ _id: -1 }).limit(5)
          // : await User.find();
         
        res.status(200).json(users);
      } catch (error) {
          console.log(error);
        res.status(500).json(error);
      }
});


//get one advert 

router.get("/:id", async (req, res) => {
    try {
        const advert = await Advert.findOne({id: req.params.id});
        res.status(200).json(advert);
    } catch (error) {
         res.status(500).json(error);
    }
});

router.get("/getadvertbyuser/:user_id", async (req, res) => {
    try {
        const advert = await Advert.findOne({user_id: req.params.id});
        res.status(200).json(advert);
    } catch (error) {
         res.status(500).json(error);
    }
});

router.put("/:id", async (req, res)=>{
   try {
       const updatedAdvert = await Advert.findByIdAndUpdate(
           req.params.id,
           {
               $set:req.body,
           },
           {new:true}
       );
       res.status(201).json(updatedAdvert);
   } catch (error) {
       
   }
});

router.delete("/:id", async (req, res)=>{
   try {
       await Advert.findByIdAndUpdate(req.params.id);
       res.status(200).json("Product has been deleted!");
   } catch (error) {
       res.status(500).json(error);
   }
});

module.exports = router;