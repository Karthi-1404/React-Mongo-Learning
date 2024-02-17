const { buildSchema } = require('graphql');


// Define a custom scalar type for dates
// const DateTime = new GraphQLScalarType({
//     name: 'DateTime',
//     description: 'A date and time string in ISO 8601 format',
//     // parseValue(value) {
//     //   return new Date(value);
//     // },
//     // serialize(value) {
//     //   return value.getTime();
//     // },
//     // parseLiteral(ast) {
//     //   if (ast.kind === Kind.INT) {
//     //     return new Date(parseInt(ast.value, 10));
//     //   }
//     //   return null;
//     // },
//   });

const schema = buildSchema(`
scalar DateTime
type User {
    _id:ID!
    name: String!
    email: String!
    role: String!
    status: String!
    createdAt:DateTime!
    updatedAt:DateTime!
}
type query {
    users: [User!]!
}
schema{
    query:query
}
`)

module.exports = schema