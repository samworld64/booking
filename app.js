const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./config/db");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

const app = express();
const port = 3000;
// add dotenv
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const events = (eventIds) => {
  return Event.find({ _id: { $in: eventIds } })
    .then((events) => {
      return events.map((event) => {
        return {
          ...event._doc,
          _id: event.id,
          creator: user.bind(this, event._doc.creator),
        };
      });
    })
    .catch((error) => {
      throw error;
    });
};
const user = (userId) => {
  return User.findById(userId).then((user) => {
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  });
};

app.use(
  "/api",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);
app.get("/", (req, res, next) => res.send("Hello World!"));
app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port ${port}!`);
});
