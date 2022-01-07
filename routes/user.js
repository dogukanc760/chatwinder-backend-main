const router = require("express").Router();
const CryptoJS = require("crypto-js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndadmin,
} = require("./verifytoken");
const User = require("../models/User");
const Follower = require("../models/Follower");
const LivedUser = require("../models/LivedUser");

//create live-stream by user
router.post("/create-live", async (req, res) => {
  const newLived = new LivedUser(req.body);
  try {
    const liveStream = await newLived.save();
    res.status(200).json(liveStream);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get stream by userid
router.get("/get-stream-byuser/:id", async (req, res) => {
  try {
    const findLive = await LivedUser.findOne({ user_id: req.params.id });

    res.status(201).json(findLive);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.find({ username: { $regex: req.params.id } });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update-str/:id", async (req, res) => {
  try {
    const updatedAdvert = await LivedUser.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedAdvert);
  } catch (error) {
    res.status(500).json(error);
  }
});

//put connection code and other live-stream by user
router.put("/update-live/:id/:code", async (req, res) => {
  try {
    const findLive = await LivedUser.findOne({ _id: req.params.id });
    findLive.connection_code = req.params.code;
    const update = await LivedUser.findByIdAndUpdate(
      findLive._id,
      {
        $set: findLive,
      },
      { new: true }
    );
    res.status(201).json(update);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//delete live stream
router.delete("/delete-live/:id", async (req, res) => {
  try {
    await LivedUser.findByIdAndUpdate(req.params.id);
    res.status(200).json("Live has been deleted!");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get-following-list/:userId", async (req, res) => {
  try {
    console.log(req.params.userId);
    const findUser = await Follower.find({ followingId: req.params.userId });
    res.status(200).json(findUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/get-follower-list/:userId", async (req, res) => {
  try {
    const findUser = await Follower.find({
      followerId: { $in: req.params.userId },
    });
    console.log(findUser);
    res.status(200).json(findUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//user Follow someone
router.post("/follow/:followerUserId/:followingUserId", async (req, res) => {
  const newFollower = new Follower({
    followerId: req.params.followerUserId,
    followingId: req.params.followingUserId,
  });
  try {
    const followedUser = await newFollower.save();
    res.status(201).json(followedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

//user unFollow someone
router.put("/unfollow/:followerUserId/:followingUserId", async (req, res) => {
  try {
    const findFollowing = await Follower.findOne({
      followingId:{$in:req.params.followingUserId},
      followerId:{$in:req.params.followerUserId}
    });
    console.log(findFollowing._id)
    findFollowing.followingId="";
    const unFollow = await Follower.findByIdAndUpdate(
      findFollowing._id,
      {
        $set: findFollowing,
      },
      { new: true }
    );
    console.log(unFollow + "" + req.params.followingUserId)
    res.status(201).json(unFollow);
  } catch (error) {
    res.status(500).json(error);
  }
});

//user update
router.put("/:id", async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(403).json(error);
  }
});

//user update stream active
router.put("/changeStreamStatus/:id", async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(403).json(error);
  }
});

//user delete

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//ban user
router.post("/ban/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isActive = false;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: user,
      },
      { new: true }
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

//unban user
router.post("/unban/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isActive = true;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: user,
      },
      { new: true }
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all users
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/update-wallet/:userId/:changetype", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (req.params.changetype) {
      user.wallet += req.body.wallet;
      const savedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: user,
        },
        { new: true }
      );
    } else {
      user.wallet -= req.body.wallet;
      const savedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: user,
        },
        { new: true }
      );
    }
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get active users
router.get("/getActiveStreamer", async (req, res) => {
  // const query = req.query.new;
  try {
    const users = await User.find({
      isStreaming: { $in: true },
    });
    // ? await User.find().sort({ _id: -1 }).limit(5)
    // : await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user stats

router.get("/stats", async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $mont: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
