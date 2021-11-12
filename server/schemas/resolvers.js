// Why is AuthError not working(check syntax)


const { signToken } = require('../utils/auth');
const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');


// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {
    Query: {
        me: async (parent, args, { user }) => {
            // find user and associated saved books
            return await User.findOne({ _id: user._id }).populate('savedBooks');
        }
            
    },



    Mutation: {

        login: async (parent, { email, password }) => {
        // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
        const user = await User.findOne({ email });
        },
        addUser: async (parent, { username, email, password }) => {
            // First we create the user
            const user = await User.create({ username, email, password });
            // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
            const token = signToken(user);
            // Return an `Auth` object that consists of the signed token and user's information
            return { token, user };
          },

          saveBook: async (parent, { user}, {book}) => {
            return User.findOneAndUpdate(
              { id: user._id },
              { $addToSet: { savedBooks: book } },
              {
                new: true,
                runValidators: true,
              }
            );  
            },

            deleteBook: async (parent, { bookId }, {user}) => {
                return User.findOneAndUpdate(
                  { _id: user._id },
                  { $pull: { savedBooks: { bookId: bookId } } },
                  { new: true }
                );
              },

},
}

    module.exports = resolvers;