const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndadmin,
} = require("./verifytoken");
const Logger = require("../models/Logger");


//create log
router.post("/", async (req, res) => {
   const newLogger = new Logger(req.body);
   try {
       const savedLogger = await newLogger.save();
       res.status(201).json(savedLogger);
   } catch (error) {
       res.status(500).send(error);
   }
});


//get all logs 
router.get("/", async (req, res) => {
      try {
          const logger = await Logger.find();
          res.status(200).json(logger);
      } catch (error) {
          res.status(500).send(error);
      }
});

//get log by log level
router.get("/get-by-type/:type", async (req, res)=>{
    try {
        const logger = await Logger.find({
            logLevel: {$in:[req.params.type]}
        });
        console.log(req.params.type);
        res.status(200).json(logger);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

//get log by user
router.get("/get-by-user/:type", async (req, res)=>{
    try {
        const logger = await Logger.find({
            logUser: {$in:req.params.type}
        });
        res.status(200).json(logger);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get log by user and type
router.get("/get-by-user-type/:userid/:type", async (req, res)=>{
    try {
        const logger = await Logger.find({
            logUser: {$in:req.params.userid},
            logLevel:{$in:req.params.type}
        });
        res.status(200).json(logger);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;