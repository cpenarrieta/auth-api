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

  input LoginInput {
    email: String
    password: String
  }

  type LoginResponse {
    accessToken: String
  }

  type Query {
    users: [User]
    me: User
  }

  type Mutation {
    createUser(user: UserInput): User
    login(user: LoginInput): LoginResponse
    revokeRefreshToken(userId: ID): Boolean
  }
`;

export default typeDefs;
