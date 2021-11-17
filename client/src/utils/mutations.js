//set up mutations for database updates, reference API and typedefs
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          authors
          descritpion
          title
          image

        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      username
      email
      bookCount
      savedBooks{
          bookId
          authors
          descritpion
          title
          image
      }
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($book: InputBook ) {
    saveBook(book: $book) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        title
        authors
        image
        description
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation deleteBook($bookID: String!) {
    deleteBook(bookID: $bookId) {
        _id
        username
        email
        bookCount
        savedBooks{
          bookId
          title
          authors
          image
          description
      }
    }
  }
`;

