const express = require("express");
const AuthorizationMiddleware = require("../middlewares/authorization");

const RequestRepo = require("../Repositories/RequestRepository");
const ActivityRepo = require("../Repositories/ActivityRepository");
const UserRepo = require("../Repositories/UserRepository");

const validateRequests = require("../Helpers/validateRequests");
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

  let userRequests = await RequestRepo.getUserRequests(userId);

  if (userRequests == null)
    return res.status(400).json({
      msg: "User not found.",
      code: "ACTIVITY-004",
    });

  return res.status(200).send(userRequests);
});

//create new join request for the current user to some activity
router.post("/add", AuthorizationMiddleware.verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { error } = validateObjectId(userId);
  if (error)
    return res.status(500).json({ msg: error.details, code: "REQUEST-001" });

  const requestValidationError = validateRequests(req.body).error;
  if (requestValidationError) {
    return res.status(500).json({
      msg: getErrorMessagesArray(requestValidationError),
      code: "REQUEST-007",
    });
  }

  const user = await UserRepo.getUserById(userId);

  if (user == null)
    return res.status(400).json({
      msg: "User not found.",
      code: "REQUEST-004",
    });

  const activity = await ActivityRepo.getActivityById(req.body.activityId);

  if (activity) {
    if (userId != activity.host) {
      const joinRequest = {
        participantId: userId,
        hostId: activity.host,
        ...req.body,
      };

      if (
        !(await RequestRepo.checkIfRequestAlreadyExists(joinRequest)).length
      ) {
        await RequestRepo.saveRequest(joinRequest);
        return res.status(200).send("Request created successfully.");
      } else {
        return res.status(400).json({
          msg: "Join request already sent.",
          code: "REQUEST-009",
        });
      }
    } else {
      return res.status(400).json({
        msg: "Participant cannot be the activity host.",
        code: "REQUEST-008",
      });
    }
  }
});

// cancel join request
router.put(
  "/cancel/:requestId",
  AuthorizationMiddleware.verifyToken,
  async (req, res) => {
    const userId = req.user.id;
    const { error } = validateObjectId(userId);
    if (error)
      return res.status(500).json({ msg: error.details, code: "REQUEST-001" });
    const { requestId } = req.params;
    const request = await RequestRepo.getRequestById(requestId);
    if (request) {
      if (request.participantId == userId) {
        if (request.status == "PENDING") {
          //update request status
          await RequestRepo.updateRequest(requestId, { status: "CANCELED" });
          return res.status(200).send("Request canceled successfully.");
        } else {
          return res.status(400).json({
            msg: "Only pending requests can be canceled",
            code: "REQUEST-009",
          });
        }
      } else {
        return res.status(403).json({
          msg: "You don't have access rights to update this request",
          code: "REQUEST-002",
        });
      }
    } else {
      return res.status(404).json({
        msg: "Request may be deleted.",
        code: "REQUEST-003",
      });
    }
  }
);

// accept join request
router.put(
  "/accept/:requestId",
  AuthorizationMiddleware.verifyToken,
  async (req, res) => {
    const userId = req.user.id;
    const { error } = validateObjectId(userId);
    if (error)
      return res.status(500).json({ msg: error.details, code: "REQUEST-001" });
    const { requestId } = req.params;
    const request = await RequestRepo.getRequestById(requestId);
    if (request) {
      if (request.hostId == userId) {
        if (request.status == "PENDING") {
          //update request status and activity
          const activity = await ActivityRepo.getActivityById(
            request.activityId
          );

          if (
            !activity.participants.find((p) => p._id == request.participantId)
          ) {
            activity.participants.push(request.participantId);
            await ActivityRepo.updateActivity(request.activityId, activity);
            await RequestRepo.updateRequest(requestId, { status: "ACCEPTED" });

            return res
              .status(200)
              .send(
                "request accepted and participant successfully Joined activity."
              );
          } else {
            return res.status(404).json({
              msg: "participant already joined this activity.",
              code: "REQUEST-006",
            });
          }
        } else {
          return res.status(400).json({
            msg: "Only pending requests can be accepted",
            code: "REQUEST-009",
          });
        }
      } else {
        return res.status(403).json({
          msg: "You don't have access rights to update this request",
          code: "REQUEST-002",
        });
      }
    } else {
      return res.status(404).json({
        msg: "Request may be deleted.",
        code: "REQUEST-003",
      });
    }
  }
);

// reject join request
router.put(
  "/reject/:requestId",
  AuthorizationMiddleware.verifyToken,
  async (req, res) => {
    const userId = req.user.id;
    const { error } = validateObjectId(userId);
    if (error)
      return res.status(500).json({ msg: error.details, code: "REQUEST-001" });
    const { requestId } = req.params;
    const request = await RequestRepo.getRequestById(requestId);
    if (request) {
      if (request.hostId == userId) {
        if (request.status == "PENDING") {
          //update request status
          await RequestRepo.updateRequest(requestId, { status: "REJECTED" });
          return res.status(200).send("Request rejected successfully.");
        } else {
          return res.status(400).json({
            msg: "Only pending requests can be rejected",
            code: "REQUEST-009",
          });
        }
      } else {
        return res.status(403).json({
          msg: "You don't have access rights to update this request",
          code: "REQUEST-002",
        });
      }
    } else {
      return res.status(404).json({
        msg: "Request may be deleted.",
        code: "REQUEST-003",
      });
    }
  }
);

function getErrorMessagesArray(errorObj) {
  const errorList = [];
  errorObj.details.forEach((error) => {
    errorList.push(error.message);
  });
  return errorList;
}

module.exports = router;
