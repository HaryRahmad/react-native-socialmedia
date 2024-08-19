const { ObjectId } = require("mongodb");
const Follow = require("../models/Follow");

const typeDefs = `#graphql
    type Follow{
        _id: ID
        followingId: ID
        followersId: ID
        createdAt: String
        updatedAt: String
    }
    type Mutation{
        addFollow(followingId: String): String
    }
`;
const resolvers = {
  Mutation: {
    addFollow: async (_, args, contexValue) => {
      const user = contexValue.auth();
    //   console.log(user);
      const { followingId } = args;
      const addFollow = await Follow.addFollow({followingId: new ObjectId(String(followingId))}, user.id);
      return addFollow;
    },
  },
};
module.exports = { resolvers, typeDefs };
