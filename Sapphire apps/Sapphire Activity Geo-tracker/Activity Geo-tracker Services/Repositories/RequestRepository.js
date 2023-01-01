const Request = require("../Models/Requests");
const UserRepo = require("./UserRepository");

module.exports = {
  // saves new request info to the collection
  saveRequest: async function (requestData) {
    const request = new Request({
      ...requestData,
    });
    return await request.save();
  },

  checkIfRequestAlreadyExists: async function (requestData) {
    return await Request.find({
      ...requestData,
      status: { $in: ["PENDING", "ACCEPTED"] },
    });
  },

  // gets request info by id
  getRequestById: async function (id) {
    return await Request.findById(id);
  },

  // updates request info
  updateRequest: async function (requestId, obj) {
    return await Request.findByIdAndUpdate(requestId, obj, { new: true });
  },

  // returns all user activities info
  getUserRequests: async function (userId) {
    const user = await UserRepo.getUserByIdWithRequests(userId);
    if (user) return user.requests;
    return null;
  },

  // deletes activity info from activities collection and removes activity from user activities list
  deleteActivityById: async function (id) {
    const activity = await this.getActivityById(id);
    await UserRepo.deleteUserActivity(activity.host, id);
    await Activity.deleteOne({ _id: id });
  },
};
