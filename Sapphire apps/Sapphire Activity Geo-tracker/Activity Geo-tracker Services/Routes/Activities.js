const express = require("express");
const AuthorizationMiddleware = require("../middlewares/authorization");
const fs = require("fs-extra");
var path = require("path");

const ActivityRepo = require("../Repositories/ActivityRepository");
const UserRepo = require("../Repositories/UserRepository");

const validateActivities = require("../Helpers/validateActivities");
const validateObjectId = require("../Helpers/validateObjectId");

const router = express.Router();

//for test
router.get("/", async (req, res) => {
  return res.status(200).send("connected");
});

//get all activities for current user
router.get("/all", AuthorizationMiddleware.verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { error } = validateObjectId(userId);
  if (error)
    return res.status(500).json({ msg: error.details, code: "ACTIVITY-001" });

  let userActivities = await ActivityRepo.getUserActivities(userId);

  if (userActivities == null)
    return res.status(400).json({
      msg: "User not found.",
      code: "ACTIVITY-004",
    });

  return res.status(200).send(filterUserDTO(userActivities));
});

//get all activities for current user
router.post("/add", AuthorizationMiddleware.verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { error } = validateObjectId(userId);
  if (error)
    return res.status(500).json({ msg: error.details, code: "ACTIVITY-001" });

  let user = await UserRepo.getUserById(userId);

  if (user == null)
    return res.status(400).json({
      msg: "User not found.",
      code: "ACTIVITY-004",
    });

  if (req.body.name && req.body.type) {
    //adding activity object to DB
    const activityObj = {
      host: userId,
      startDate: req.startDate || Date.now(),
      name: req.body.name,
      type: req.body.type,
      status: req.body.type,
    };
    console.log(activityObj);
    const activity = await ActivityRepo.saveActivity(activityObj);
    console.log(activity);

    user.activities.push({ activity: activity });
    user = await UserRepo.updateUser(user._id, user);
    console.log(user);
    return res.status(200).send("activity created successfully.");
  } else {
    return res.status(400).json({
      msg: "Please provide activity details.",
      code: "ACTIVITY-005",
    });
  }
});

// update activity by id
router.put(
  "/update/:activityId",
  AuthorizationMiddleware.verifyToken,
  async (req, res, next) => {
    const userId = req.user.id;
    const { error } = validateObjectId(userId);
    if (error)
      return res.status(500).json({ msg: error.details, code: "ACTIVITY-001" });
    const { activityId } = req.params;
    const activity = await ActivityRepo.getActivityById(activityId);
    if (activity) {
      if (activity.host == userId) {
        //update activity
        await ActivityRepo.updateActivity(activityId, req.body);
        return res.status(200).send("Activity has been updated.");
      } else {
        return res.status(403).json({
          msg: "You don't have access rights to update this activity",
          code: "ACTIVITY-002",
        });
      }
    } else {
      return res.status(404).json({
        msg: "Activity may be deleted.",
        code: "ACTIVITY-003",
      });
    }
  }
);

// add member to activity
router.put(
  "/add-participant/:activityId",
  AuthorizationMiddleware.verifyToken,
  async (req, res, next) => {
    const userId = req.user.id;
    const { error } = validateObjectId(userId);
    if (error)
      return res.status(500).json({ msg: error.details, code: "ACTIVITY-001" });
    const { activityId } = req.params;
    const activity = await ActivityRepo.getActivityById(activityId);
    if (activity) {
      if (activity.host == userId) {
        //update activity
        const activity = await ActivityRepo.getActivityById(activityId);

        if (
          !activity.participants.find((p) => p._id == req.body.participantId)
        ) {
          activity.participants.push(req.body.participantId);
          await ActivityRepo.updateActivity(activityId, activity);
          return res
            .status(200)
            .send("participant successfully Joined activity.");
        } else {
          return res.status(404).json({
            msg: "participant already joined this activity.",
            code: "ACTIVITY-006",
          });
        }
      } else {
        return res.status(403).json({
          msg: "You don't have access rights to update this activity",
          code: "ACTIVITY-002",
        });
      }
    } else {
      return res.status(404).json({
        msg: "Activity may be deleted.",
        code: "ACTIVITY-003",
      });
    }
  }
);

// remove member to activity
router.put(
  "/remove-participant/:activityId",
  AuthorizationMiddleware.verifyToken,
  async (req, res, next) => {
    const userId = req.user.id;
    const { error } = validateObjectId(userId);
    if (error)
      return res.status(500).json({ msg: error.details, code: "ACTIVITY-001" });
    const { activityId } = req.params;
    const activity = await ActivityRepo.getActivityById(activityId);
    if (activity) {
      if (activity.host == userId) {
        //update activity
        const activity = await ActivityRepo.getActivityById(activityId);
        const participantIndex = activity.participants.findIndex((p) => p._id == req.body.participantId)
        if (participantIndex > -1) {
          activity.participants.splice(participantIndex, 1);
          await ActivityRepo.updateActivity(activityId, activity);
          return res.status(200).send("participant removed from activity successfully.");
        } else {
          return res.status(404).json({
            msg: "participant did not join this activity",
            code: "ACTIVITY-006",
          });
        }
      } else {
        return res.status(403).json({
          msg: "You don't have access rights to update this activity",
          code: "ACTIVITY-002",
        });
      }
    } else {
      return res.status(404).json({
        msg: "Activity may be deleted.",
        code: "ACTIVITY-003",
      });
    }
  }
);

// deletes activity by id
router.delete(
  "/delete/:activityId",
  AuthorizationMiddleware.verifyToken,
  async (req, res, next) => {
    const userId = req.user.id;
    const { error } = validateObjectId(userId);
    if (error)
      return res.status(500).json({ msg: error.details, code: "ACTIVITY-001" });

    const { activityId } = req.params;
    const activity = await ActivityRepo.getActivityById(activityId);
    if (activity) {
      if (activity.host == userId) {
        //delete activity
        await ActivityRepo.deleteActivityById(activityId);
        return res.status(200).send("Activity has been deleted.");
      } else {
        return res.status(403).json({
          msg: "You don't have access rights to delete this activity",
          code: "ACTIVITY-002",
        });
      }
    } else {
      return res.status(404).json({
        msg: "Activity may be deleted.",
        code: "ACTIVITY-003",
      });
    }
  }
);

function filterUserDTO(user) {
  let userJSON = JSON.parse(JSON.stringify(user));
  delete userJSON["password"];
  delete userJSON["__v"];
  delete userJSON["_id"];
  return userJSON;
}

module.exports = router;
