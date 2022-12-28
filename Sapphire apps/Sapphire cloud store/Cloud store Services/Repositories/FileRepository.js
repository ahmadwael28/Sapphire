const File = require("../Models/Files");
const UserRepo = require("./UserRepository");

module.exports = {
  // saves new file info to the collection
  saveFile: async function (fileData) {
    const file = new File({
      ...fileData,
    });
    return await file.save();
  },

  // gets file info by id
  getFileById: async function (id) {
    return await File.findById(id);
  },

  // returns all user files info
  getUserFiles: async function (userId) {
    const user = await UserRepo.getUserByIdWithFiles(userId);
    if (user) return user.files;
    return null;
  },

  // deletes file info from file collection and removed file from user file list
  deleteFileById: async function (id) {
    const file = await this.getFileById(id);
    await UserRepo.deleteUserFile(file.user, id);
    await File.deleteOne({ _id: id });
  },
};
