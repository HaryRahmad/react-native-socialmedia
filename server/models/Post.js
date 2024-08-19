const { ObjectId } = require("mongodb");
const database = require("../config/mongodb");

class Post {
  static collection() {
    return database.collection("posts");
  }
  static async validate() {
    const data = this.collection().findOne({ data });
    if (!data) {
      throw new Error("email is uniqe");
    }
  }
  static async getAll() {
    const agg = [
      {
        $lookup: {
          from: "users",
          localField: "AuthorId",
          foreignField: "_id",
          as: "Author",
        },
      },
      {
        $unwind: {
          path: "$Author",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $unset: "Author.password",
      },
      {
        $sort: {
          field1: -1,
        },
      },
    ];
    const posts = await this.collection().aggregate(agg).toArray();
    // console.log(posts);
    return posts;
  }
  static async getById(data) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(data.id)),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "AuthorId",
          foreignField: "_id",
          as: "Author",
        },
      },
      {
        $unwind: {
          path: "$Author",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $unset: "Author.password",
      },
    ];
    const post = await this.collection().aggregate(agg);
  }
  static async createPost(data, user) {
    // console.log(user);
    data.AuthorId = new ObjectId(String(user));
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const dataPost = await this.collection().insertOne(data);
    return "success add data";
  }
  static async createdCommend(data, user) {
    // console.log(data, `llllllllllllllll`);
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const addComment = await this.collection().updateOne(
      {
        // content: args.content, username: user.username,createdAt: new Date(), updatedAt: new Date()}
        _id: new ObjectId(String(user)),
      },
      {
        $push: {
          comments: {
            content: data.content,
            username: data.user.username,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          },
        },
      }
    );
    return "success add comment";
  }
  static async addDataLike(data, user) {
    console.log(data, user);
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const addLike = await this.collection().updateOne(
      {
        // content: args.content, username: user.username,createdAt: new Date(), updatedAt: new Date()}
        _id: new ObjectId(String(user)),
      },
      {
        $push: {
          likes: {
            username: data.user.username,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          },
        },
      }
    );
    return "success add Like";
  }
}

module.exports = Post;
