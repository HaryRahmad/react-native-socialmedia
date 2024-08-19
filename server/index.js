require(`dotenv`).config()
const { ApolloServer } = require(`@apollo/server`);
const { startStandaloneServer } = require(`@apollo/server/standalone`);

const {
    typeDefs: userTypeDefs,
    resolvers: userResolvers,
} = require("./schemas/user")

const {
    typeDefs: postTypeDefs,
    resolvers: postResolvers,
} = require("./schemas/post");

const {
    typeDefs: followTypeDefs,
    resolvers: followResolvers,
} = require("./schemas/follow");

const { verify } = require("./helpers/jwt");

const server = new ApolloServer({
    typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
    resolvers: [userResolvers, postResolvers, followResolvers],
    introspection:true
})


startStandaloneServer(server,{
    listen: {port: process.env.PORT||3000},
    context: ({req, res}) =>{
        // console.log(req.headers.authorization,`----------`);
        return{
            auth: () =>{
                // console.log(req.headers, `--------------11`);
                const auth = req.headers.authorization
                // console.log(auth);
                if (!auth) {
                    throw new Error("not authenticate")
                }
                const [bearer, token] = auth.split(" ")
                if (bearer !== "Bearer") {
                    throw new Error("not authenticate")
                }
                const data = verify(token)
                if (!data) {
                    throw new Error("not authenticate")
                }
                return data
            }
        }
    }
}).then(({url}) => {
    console.log(`server ready at: ${url}`);
})
