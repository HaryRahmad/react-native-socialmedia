const { sign } = require("../helpers/jwt");
const User = require(`../models/User`);
const bcrypt = require("bcrypt");

const typeDefs = `#graphql
    type User{
        _id: ID
        name: String
        username: String
        email: String
        password: String
        createdAt: String
        updatedAt: String
        followerDetail:[FollowDetail]
        followingDetail:[FollowDetail]
    }
    type FollowDetail{
      _id: ID
      name: String
      username: String
    }
    input NewUser {
        name: String
        username: String
        email: String
        password: String
    }
    input LoginUser {
        email: String
        password: String
    }

    type Query {
        users: [
            User
        ]
        search(username: String): [User]
        findById: [User]
    }
    type AccessToken{
      accessToken: String
    }
    type Mutation {
        register(email:String, username:String, name:String, password:String): User
        login(email: String, password: String): AccessToken
    }
    
    # type Mutation {
    #     login(user: LoginUser): User
    # }

`;

const resolvers = {
  Query: {
    users: async (_, args) => {
      return [];
    },
    search: async (_, args) => {
      // console.log(args);
      const { username } = args;
      const data = await User.searchUser(username);
      // console.log(data.username);
      return data;
    },
    findById: async (_, args, contextValue) => {
      // console.log(contextValue);
      const id = contextValue.auth()
      // const { userId } = args;
      // console.log(userId);
      const data = await User.findById(id);
      console.log(data,`22222222222222`);
      return data;
    },
  },
  Mutation: {
    register: async (_, args) => {
      console.log(args,`-----------------<`);
      const newUser = { ...args };
      if (!newUser.username || !newUser.email || !newUser.password) {
        throw new Error("data is required");
      }
      if (newUser.password.length < 5) {
        throw new Error("data password input minimum 5 character")
      }
      const salt = bcrypt.genSaltSync(10);
      newUser.password = bcrypt.hashSync(newUser.password, salt);
      const result = await User.create(newUser);
      return result;
    },
    login: async (_, args) => {
      // const loginUser = { ...args.user };
      // if (!loginUser.password) {
      //   throw new Error("password is required")
      // }
      const { email, password } = args;
      console.log(args,`---------`);
      if (!email) {
        throw new Error("email is required");
      }
      const checkUser = await User.login(email);
      const check = bcrypt.compareSync(password, checkUser.password);
      // console.log(check);
      if (!check) {
        throw new Error("email/password is invalid");
      }
      // console.log(checkUser);

      const dataToken = sign({
        id: checkUser._id,
        username: checkUser.username,
        email: checkUser.email,
      });
      // console.log(dataToken);

      const token = {
        accessToken: dataToken,
      };

      return token;
    },
  },
};
module.exports = { resolvers, typeDefs };
