const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Define which fields are/create an 'input' type 

  input InputBook {  
    bookId: String!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook( input: InputBook ): User
    removeBook(bookId: String!): User
  }

  type User {
      _id: ID!
      username: String!
      email: String!
      bookCount: Int
      savedBooks: [Book]
  }

  type Book {
    bookId: String!
    authors: [String]
    description: String!
    title: String!
    image: String
    Link: String
}

    type Auth{
        token: ID!
        user: User
    }

  # Define which queries the front end is allowed to make and what data is returned

  type Query {
    me: User
  }
`;

module.exports = typeDefs;
