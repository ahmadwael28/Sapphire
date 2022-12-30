const Activity = require("../Models/Activities");
const UserRepo = require("./UserRepository");

module.exports = {
  // saves new activity info to the collection
  saveActivity: async function (activityData) {
    const activitiy = new Activity({
      ...activityData,
    });
    return await activitiy.save();
  },

  // gets activity info by id
  getActivityById: async function (id) {
    return await Activity.findById(id);
  },

  // updates activity info
  updateActivity: async function (activityId, obj) {
    return await Activity.findByIdAndUpdate(activityId, obj, { new: true });
  },

  // returns all user activities info
  getUserActivities: async function (userId) {
    const user = await UserRepo.getUserByIdWithActivities(userId);
    if (user) return user.activities;
    return null;
  },

  // deletes activity info from activities collection and removes activity from user activities list
  deleteActivityById: async function (id) {
    const activity = await this.getActivityById(id);
    await UserRepo.deleteUserActivity(activity.host, id);
    await Activity.deleteOne({ _id: id });
  },
};
