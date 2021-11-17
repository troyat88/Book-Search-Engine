import { gql } from '@apollo/client';

export const GET_ME = gql`
  # create a GraphQL query to be executed by Apollo Client
  query me {
      me {
        _id
          savedBooks {
            bookId
				    image
				    title
				    authors
				    description
        }
     }
  }
`;