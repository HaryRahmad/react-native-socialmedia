const { ObjectId } = require("mongodb");
const database = require("../config/mongodb");

class Follow {
  static collection() {
    return database.collection("follows");
  }
  static async addFollow(data, followers) {
    data.createdAt = new Date();
    data.updatedAt = new Date();
    data.followersId = new ObjectId(String(followers));
    await this.collection().insertOne(data);
    return "berhasil mem-follow"
  }
}

module.exports = Follow;
