const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndadmin,
} = require("./verifytoken");
const Image = require("../models/UserImage");

//get all images
router.get("/", async (req, res) => {
 try {
     const images = await Image.find();
     res.status(200).json(images);
 } catch (error) {
     res.status(500).json(error);
 }
});


//get just one image 
router.get("/find/:id", async (req, res) => {
    try {
        const image = await Image.find({_id: {$in:[req.params.id]}});
        console.log(req.params.id);
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get just user image 
router.get("/find-by-user/:id", async (req, res) => {
    try {
        const image = await Image.find({user_id: {$in:[req.params.id]}});
        console.log(req.params.id);
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json(error);
    }
});


//create image for user profile 
router.post("/setprofileimage", async (req, res) => {
    if(req.body.isProfile){
        const newImage = new Image({
            user_id:req.body.user_id,
            desc:req.body.desc,
            imagepath:req.body.imagepath,
            isProfile:true
        });
        try {
            const savedImage = await newImage.save();
            console.log(savedImage);
            res.status(201).json(savedImage);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
    res.status(500).json("Profil resmi olarak göndermen gerek!");
    
});

router.post("/setdefaultimage", async (req, res) => {
    if(!req.body.isProfile){
        const newImage = new Image({
            user_id:req.body.user_id,
            desc:req.body.desc,
            imagepath:req.body.imagepath,
            isProfile:false,
        });
        try {
            const savedImage = await newImage.save();
            console.log(savedImage);
            res.status(201).json(savedImage);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
    res.status(500).json("Profil resmi bu şekilde eklenemez!!");
    
});

//put-update User  Images 
router.put("/putImage/:id", async (req, res)=>{
  try {
      const updatedImage = await Image.findByIdAndUpdate(
          req.params.id,
          {
              $set:req.body
          },
          {new:true}
      );
      res.status(201).json(updatedImage);
  } catch (error) {
      res.status(403).json(error);
  }
});

//delete just one image
router.delete("/deleteImage/:id", async (req, res)=>{
    try {
        await Image.findOneAndDelete(req.params.id);
        res.status(200).json("Image has been deleted!");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;