const User = require("../Models/Users");

module.exports = {
  GetAllUsers: async function () {
    return await User.find({}).populate("Orders.id");
  },

  // creates new user in the DB
  saveUser: async function (userData) {
    const user = new User({
      ...userData,
    });
    return await user.save();
  },

  // returns user info by id
  getUserById: async function (id) {
    return await User.findById(id);
  },

  // deletes a file by id from user file list
  deleteUserFile: async function (id, fileId) {
    const user = await this.getUserById(id);
    const updatedFiles = user.files.filter((f) => f.file != fileId);
    user.files = updatedFiles;
    user.save();
  },

  // updates user info
  updateUser: async function (Id, obj) {
    return await User.findByIdAndUpdate(Id, obj, { new: true });
  },

  // gets user info by username or email
  getUserByEmailOrUserName: async function (username) {
    if (username)
      return (
        (await User.findOne({ email: username })) ||
        (await User.findOne({ username: username }))
      );
    else return null;
  },

  // gets user by id and populates user file list
  getUserByIdWithFiles: async function (id) {
    const user = await User.findById(id).populate("files.file");
    return user;
  },

  // checks if a username is used by some user
  isUsernameInUse: async function (username) {
    const user = await User.findOne({ username: username });
    if (user == null) return false;
    return true;
  },

  // checks if an account exists with the received email
  isExistingEmail: async function (email) {
    const user = await User.findOne({ email: email });
    if (user == null) return false;
    return true;
  },
};
