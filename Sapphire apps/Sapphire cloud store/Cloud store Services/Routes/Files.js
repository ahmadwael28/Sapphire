const express = require("express");
const AuthorizationMiddleware = require("../middlewares/authorization");
const fs = require("fs-extra");
const multer = require("multer");
var path = require("path");

const FileRepo = require("../Repositories/FileRepository");
const UserRepo = require("../Repositories/UserRepository");

const validateFiles = require("../Helpers/validateFiles");
const validateObjectId = require("../Helpers/validateObjectId");

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      const path = `./uploads/files`;
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

// upload file to current user storage
router.post(
  "/upload-file",
  AuthorizationMiddleware.verifyToken,
  upload.single("file"),
  async (req, res) => {
    const userId = req.user.id;
    const { error } = validateObjectId(userId);
    if (error)
      return res.status(500).json({ msg: error.details, code: "FILE-001" });

    let user = await UserRepo.getUserById(userId);

    if (user == null)
      return res.status(400).json({
        msg: "User not found.",
        code: "FILE-004",
      });

    if (req.file) {
      //adding file object to DB
      const fileObj = {
        user: userId,
        date: Date.now(),
        size: req.file.size,
        name: req.file.originalname,
        storageName: req.file.filename,
        extension: req.file.originalname.split(".").pop(),
      };

      const file = await FileRepo.saveFile(fileObj);

      user.files.push({ file: file });
      user = await UserRepo.updateUser(user._id, user);
      return res.status(200).send("File uploaded successfully.");
    } else
      return res.status(500).send({
        msg: "An error occured while uploading file. please try again.",
        code: "FILE-007",
      });
  }
);

//get all files for current user
router.get(
  "/all-files",
  AuthorizationMiddleware.verifyToken,
  async (req, res) => {
    const userId = req.user.id;
    const { error } = validateObjectId(userId);
    if (error)
      return res.status(500).json({ msg: error.details, code: "FILE-001" });

    let userFiles = await FileRepo.getUserFiles(userId);

    if (userFiles == null)
      return res.status(400).json({
        msg: "User not found.",
        code: "FILE-004",
      });

    return res.status(200).send(filterUserDTO(userFiles));
  }
);

// gets file content by file id
router.get(
  "/singlefile/:fileId",
  AuthorizationMiddleware.verifyToken,
  async (req, res, next) => {
    const userId = req.user.id;
    const { error } = validateObjectId(userId);
    if (error)
      return res.status(500).json({ msg: error.details, code: "FILE-001" });

    const { fileId } = req.params;
    const fileData = await FileRepo.getFileById(fileId);
    if (fileData) {
      if (fileData.user == userId) {
        const options = {
          root: path.dirname(path.join(__dirname)),
        };
        const filePath = path.join("uploads/files", fileData.storageName);
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
      } else {
        return res.status(403).json({
          msg: "You don't have access rights to view this file",
          code: "FILE-002",
        });
      }
    } else {
      return res.status(404).json({
        msg: "File may be deleted.",
        code: "FILE-003",
      });
    }
  }
);

// deletes file data from DB and deletes actual file from disk
router.delete(
  "/deletefile/:fileId",
  AuthorizationMiddleware.verifyToken,
  async (req, res, next) => {
    const userId = req.user.id;
    const { error } = validateObjectId(userId);
    if (error)
      return res.status(500).json({ msg: error.details, code: "FILE-001" });

    const { fileId } = req.params;
    const fileData = await FileRepo.getFileById(fileId);
    if (fileData) {
      if (fileData.user == userId) {
        const filePath = path.join("uploads/files", fileData.storageName);
        if (await fs.existsSync(filePath)) {
          fs.remove(filePath);
          await FileRepo.deleteFileById(fileId);
          return res.status(200).send("File has been deleted.");
        } else {
          return res.status(404).json({
            msg: "File may be deleted.",
            code: "FILE-003",
          });
        }
      } else {
        return res.status(403).json({
          msg: "You don't have access rights to delete this file",
          code: "FILE-002",
        });
      }
    } else {
      return res.status(404).json({
        msg: "File may be deleted.",
        code: "FILE-003",
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
