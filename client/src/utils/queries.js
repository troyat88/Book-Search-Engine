import { gql } from '@apollo/client';

export const GET_ME = gql`
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