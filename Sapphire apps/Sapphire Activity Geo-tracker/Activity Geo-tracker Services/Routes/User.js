const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs-extra");
const multer = require("multer");
var path = require("path");

const SECRET_KEY = require("../config");
const AuthorizationMiddleware = require("../middlewares/authorization");

const validateUsers = require("../Helpers/valitadeUsers");
const validateObjectId = require("../Helpers/validateObjectId");

const UserRepo = require("../Repositories/UserRepository");

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      const path = `./uploads/profilePics`;
      fs.mkdirsSync(path);
      callback(null, path);
    },
    filename: (req, file, callback) => {
      //originalname is the uploaded file's name with extnsion
      //saved file name is time stamp + file originalname
      callback(null, `${Date.now()}--${file.originalname}`);
    },
  }),
});
//for test
router.get("/", async (req, res) => {
  return res.status(200).send("connected");
});

// creates new user
router.post("/create-user", async (req, res) => {
  const { error } = validateUsers(req.body);
  if (error)
    return res
      .status(500)
      .json({ msg: "User data is not valid.", code: "USER-001" });

  //check if username is already in use
  if (await UserRepo.isUsernameInUse(req.body.username))
    return res
      .status(400)
      .json({ msg: "Username is already in use.", code: "USER-008" });

  //check if email exists
  if (await UserRepo.isExistingEmail(req.body.email))
    return res
      .status(400)
      .json({ msg: "E-mail is already in use.", code: "USER-008" });

  user = await UserRepo.saveUser(req.body);
  return res.status(200).send(filterUserDTO(user));
});

//checks if username is in use
router.post("/username-inuse", async (req, res) => {
  const username = req.body.username;
  if (!username)
    res.status(400).json({ msg: "Invalid username.", code: "USER-005" });
  return res
    .status(200)
    .json({ usernameInUse: await UserRepo.isUsernameInUse(username) });
});

//checks if email already exists
router.post("/email-exists", async (req, res) => {
  const email = req.body.email;
  if (!email)
    res.status(400).json({ msg: "Invalid e-mail.", code: "USER-006" });
  return res
    .status(200)
    .json({ emailExists: await UserRepo.isExistingEmail(email) });
});

//login a user
router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // getting user using username or email
  let user = await UserRepo.getUserByEmailOrUserName(username);
  if (user) {
    // comparing received password with stored one.
    bcrypt.compare(password, user.password, async (err, isMatched) => {
      if (isMatched) {
        // username and password match an existing user

        // preparing payload of current user to get its token
        const payload = { id: user._id, email: user.email, role: user.role };

        // generating access token
        jwt.sign(
          { user: payload },
          SECRET_KEY,
          { expiresIn: 900000 },
          (err, token) => {
            if (token) {
              res.status(200).send(token);
            } else {
              res.status(500).json({
                msg: err.details,
                code: "USER-002",
              });
            }
          }
        );
      } else {
        return res.status(400).json({
          msg: "Invalid password please try again.",
          code: "USER-003",
        });
      }
    });
  } else {
    return res.status(400).json({
      msg: "User not found please try a different username or email.",
      code: "USER-004",
    });
  }
});

//get user by token
router.get(
  "/token-details",
  AuthorizationMiddleware.verifyToken,
  async (req, res) => {
    const userId = req.user.id;
    const { error } = validateObjectId(userId);
    if (error)
      return res.status(400).json({ msg: error.details, code: "user-001" });
    else {
      let user = await UserRepo.getUserById(userId);

      if (user.image) {
        fs.readFile(
          `uploads/profilePics/${user.image}`,
          "base64",
          function (err, data) {
            user.image = data;
            return res.status(200).send(filterUserDTO(user));
          }
        );
      } else return res.status(200).send(filterUserDTO(user));
    }
  }
);

//update user info
router.put(
  "/update-user",
  AuthorizationMiddleware.verifyToken,
  async (req, res) => {
    let userId = req.user.id;

    const { error } = validateObjectId(userId);
    if (error)
      return res.status(500).json({ msg: error.details, code: "USER-001" });

    let user = await UserRepo.getUserById(userId);
    if (user == null)
      return res.status(500).send({ msg: "user not found.", code: "USER-004" });
    user = await UserRepo.updateUser(userId, req.body);

    return res.status(200).send(filterUserDTO(user));
  }
);

//delete user
router.delete(
  "/delete-user",
  AuthorizationMiddleware.verifyToken,
  async (req, res) => {
    let userId = req.user.id;
    const { error } = validateObjectId(userId);
    if (error)
      return res.status(500).json({ msg: error.details, code: "USER-001" });

    let user = await UserRepo.getUserById(userId);

    if (user == null)
      return res.status(400).json({
        msg: "User not found.",
        code: "USER-004",
      });

    user.isDeleted = true;
    user = await UserRepo.updateUser(user._id, user);

    return res.status(200).send("User deleted successfully.");
  }
);

// gets file content by file id
router.get(
  "/profile-pic",
  AuthorizationMiddleware.verifyToken,
  async (req, res, next) => {
    const userId = req.user.id;
    const { error } = validateObjectId(userId);
    if (error)
      return res.status(500).json({ msg: error.details, code: "FILE-001" });

    let user = await UserRepo.getUserById(userId);
    const options = {
      root: path.dirname(path.join(__dirname)),
    };
    const filePath = path.join("uploads/profilePics", user.image);

    if (await fs.existsSync(filePath)) {
      return res.sendFile(filePath, options, function (err) {
        if (err) {
          next(err);
        } else {
          console.log("Sent:", filePath);
        }
      });
    } else {
      return res.status(404).json({
        msg: "File may be deleted.",
        code: "FILE-003",
      });
    }
  }
);

// upload profile picture
router.post(
  "/profile-pic",
  AuthorizationMiddleware.verifyToken,
  upload.single("image"),
  async (req, res) => {
    let userId = req.user.id;
    const { error } = validateObjectId(userId);
    if (error)
      return res.status(500).json({ msg: error.details, code: "USER-001" });

    let user = await UserRepo.getUserById(userId);

    if (user == null)
      return res.status(400).json({
        msg: "User not found.",
        code: "USER-004",
      });

    if (req.file) {
      user.image = req.file.filename;
      user = await UserRepo.updateUser(user._id, user);
      return res.status(200).send("Profile picture added successfully.");
    } else
      res.status(500).send({
        msg: "An error occured while uploading profile picture. please try again.",
        code: "USER-007",
      });
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
