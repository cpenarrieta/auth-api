const typeDefs = `
  scalar Date

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    createdAt: Date
    updatedAt: Date
  }

  input UserInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(user: UserInput): User
  }
`;

export default typeDefs;
