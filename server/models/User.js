const { ObjectId } = require("mongodb");
const database = require("../config/mongodb");
const isEmail = require("../helpers/validation");

class User {
  static collection() {
    return database.collection("users");
  }
  static findUsername(data){
    // console.log(User.findOne({username:data}));
    return this.collection().findOne({username:data})
  }
  static findEmail(data){
    return this.collection().findOne({email:data})
  }
  static async create(newUser) {
    // console.log(newUser);
    // if (!newUser.username || !newUser.email || !newUser.password) {
    //     throw new Error("data is required")
    // }
    const checkUsername = await this.findUsername(newUser.username)
    console.log(checkUsername);
    if (checkUsername) {
        throw new Error("username must be uniqe")
    }
    const checkUDataEmail = await this.findEmail(newUser.email)
    if (checkUDataEmail) {
        throw new Error("email must be uniqe")
    }
    const checkEmail = await isEmail(newUser.email)
    if (!checkEmail) {
        throw new Error("data is not email")
    }
    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();
    const result = await database.collection("users").insertOne(newUser);
    return newUser;
  }

  static async login(email) {
    const user = await this.collection().findOne({
      email: email,
    });
    if (!user) {
      throw new Error(`user not found`);
    }
    return user;
  }
  static async searchUser(username) {
    const data = await this.collection()
      .find({
        username: username,
      })
      .toArray();
    // console.log(data);
    return data;
  }
  static async findById(id) {
    // console.log(id, `00000000000`);
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(id.id)),
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followerId",
          as: "following",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followers.followingId",
          foreignField: "_id",
          as: "followingDetail",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followingId",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followers.followersId",
          foreignField: "_id",
          as: "followerDetail",
        },
      },
    ];
    const data = await this.collection().aggregate(agg).toArray();
    console.log(data,`----------------`);
    return data;
  }
}

module.exports = User;
