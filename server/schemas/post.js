const redis = require("../config/redis");
const Post = require("../models/Post");

const typeDefs = `#graphql
    type Post{
        _id: ID
        content: String
        tags: [String]
        imgUrl: String
        AuthorId: ID
        comments: [Comments]
        likes: [Likes]
        createdAt: String
        updatedAt: String
        Author: AuthorDetail
    }
    type AuthorDetail{
        username: String
        email: String
        _id: ID
    }

    # input NewPost{
    #     content: String
    #     imgUrl: String
    #     tags:[String]
    # }
    type Comments{
        content: String
        username: String
        createdAt: String
        updatedAt: String
    }

    type Likes{
        username: String
        createdAt: String
        updatedAt: String
    }
    type Query{
        posts:[Post]
        postById: [Post]

    }
    type Mutation {
        addPost(content: String, imgUrl: String,tags:[String]): String
        addComment(content: String, postId: String): String
        addLike(postId: String): String
    }
`;
const resolvers = {
    Query:{
        posts: async (_, __, {auth}) =>{
            // console.log(contextValue);
            // console.log();
            console.log(auth,`1111111122222222`);
            auth()
            // const postCache = await redis.get("posts:all")
            // if (postCache) {
            //     console.log("dari cache");
            //     return JSON.parse(postCache)
            // }
            console.log("dari rumah");
            const dataPost = await Post.getAll()
            console.log(dataPost[0].Comments,`---------`);
            // await redis.set("posts:all", JSON.stringify(dataPost));
            return dataPost
        },
        postById: async (_, __, {auth}) =>{
            const user = auth()
            const dataById = await Post.getById(user)
            return dataById
        }
    },
    Mutation:{
        addPost: async (_, args, contextValue)=>{
            const user = contextValue.auth()
            // console.log(args);
            // console.log(args.post,`-------`);
            if (!user.id) {
                throw new Error("AuthorId is required")
            }
            if (!args.content) {
                throw new Error("content is required")
            }
            const newPost = { ...args};
            console.log(newPost);
            const result = await Post.createPost(newPost, user.id)
            await redis.del("posts:all");
            return result;
        },
        addComment: async (_, args, contextValue) => {
            const user = contextValue.auth()
            if (!user.username) {
                throw new Error("username is required")
            }
            // console.log(newComment);
            // console.log(args.content);
            const {content, postId} = args
            if (!content) {
                throw new Error("content is required")
            }
            const addData = await Post.createdCommend({content, user}, postId)
            return addData
        },
        addLike: async (_, args, contextValue) =>{
            const user = contextValue.auth()
            if (!user.username) {
                throw new Error("username is required")
            }
            const {postId} = args
            const addLike = await Post.addDataLike({user}, postId)
            return addLike
        }
    }

}
module.exports = {typeDefs, resolvers};


