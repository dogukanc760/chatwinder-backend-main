const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndadmin,
} = require("./verifytoken");
const StreamParams = require("../models/StreamParams");
const GeneralParams = require("../models/GeneralStreamParams");

//get one params for user
router.get("/get/:userId", async (req, res) => {
    try {
        const params = await StreamParams.findOne({userId: req.params.userId});
        res.status(200).json(params);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/get-musical", async (req, res) => {
     try {
         const getMusical = await GeneralParams.find(
             {streamType: {$in:"musical"} });
             res.status(200).json(getMusical);
     } catch (error) {
         res.status(500).json(error);
     }
}); 
router.get("/get-talk", async (req, res) => {
    try {
        const getTalk = await GeneralParams.find(
            {streamType: {$in:"talk"} });
            res.status(200).json(getTalk);
    } catch (error) {
        res.status(500).json(error);
    }
}); 

//get all params for user
router.get("/getall/", async (req, res) => {
    try {
        const params = await StreamParams.find();
        res.status(200).json(params);
    } catch (error) {
        res.status(500).json(error);
    }
});

//create Stream Params For Special
router.post("/createPersonelParams/:userId", async (req, res) => {
    const newPersonelParams = new StreamParams(req.body);
    try {
        const savedParams = await newPersonelParams.save();
        res.status(201).json(savedParams);
    } catch (error) {
        res.status(500).json(error);
    }
});

//update Stream Params For Special
router.put("/specialparams/:userId", async (req, res) => {
   try {
       const updatedParams = await StreamParams.findByIdAndUpdate(
           req.params.userId,
           {
               $set:req.body
           },
           {new:true}
       );
       res.status(201).json(updatedParams);
   } catch (error) {
       res.status(500).json(error);
   }
});
// delete Stream Params For Special
router.delete("/specialparams/:userId", async (req, res) =>{
    try {
        await StreamParams.findByIdAndDelete(req.params.id);
        res.status(200).json("Params has been deleted!");
    } catch (error) {
        res.status(500).json(error);
    }
});


//get General params for one 
router.get("/getGeneralOne/:userId", async (req, res)=>{
    try {
    const generalParams = await GeneralParams.findOne({userId:req.params.userId});
    res.status(200).json(generalParams);    
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/getGeneralsAll", async (req, res)=>{
    try {
        const generalParams = await GeneralParams.find();
        res.status(200).json(generalParams);
    } catch (error) {
        res.status(500).json(error);
    }
});

//create generalParams for users
router.post("/createGeneralStreamParams/:userId", async (req, res) => {
    const newGeneralParams = new GeneralParams(req.body);
    try {
        const savedParams = await newGeneralParams.save();
        res.status(201).json(savedParams);
    } catch (error) {
        res.status(500).json(error);
    }
});

//update generalParams for users
router.put("/updateGeneralParams/:userId/", async (req, res)=>{
   try {
       const updatedParams = await GeneralParams.findByIdAndUpdate(
           req.params.userId,
           {
               $set:req.body,
           },
           {new:true}
       );
       res.status(201).json(updatedParams);
   } catch (error) {
       res.status(500).json(error);
   }
}) ;

//delete generalParams for users
router.delete("/deleteGeneralParams/:userId", async (req, res)=>{
   try {
       await GeneralParams.findByIdAndDelete(req.params.userId);
       res.status(200).json("Params has been deleted");
   } catch (error) {
       res.status(500).json(error);
   }
});

module.exports = router;