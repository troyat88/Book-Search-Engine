
const { signToken } = require('../utils/auth');
const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');


// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {
    Query: {
        me: async (parent, args, {user} ) => {
          if (user) {
            // find user and associated saved books
            return User.findOne({ _id: user._id }).populate(savedBooks);
          }
          throw new AuthenticationError ('Please login');
        },
        
            
    },



    Mutation: {

        login: async (parent, { email, password }) => {
        // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
        const user = await User.findOne({ email: email });
        if (!user) {
          throw new AuthenticationError('No profile with this email found!');
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password!');
        }
        const token = signToken(user);
        return {token, user};
        },

        addUser: async (parent, { username, email, password }) => {
            // First we create the user
            const user = await User.create({ username, email, password });
            // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
            const token = signToken(user);
            // Return an `Auth` object that consists of the signed token and user's information
            return { token, user };
          },

          saveBook: async (parent, {book} , {user} ) => {
            try { 
              if (user){
              const updatedUser = await User.findOneAndUpdate(
              { _id: user._id },
              { $addToSet: { savedBooks: book } },
              {
                new: true,
                runValidators: true,
              }
            );
            console.log(user)
            return updatedUser
            
            }
          }catch (err){
            console.log(err);
            throw new AuthenticationError('${err}');
          }
        },



            removeBook: async (parent, { bookId }, {user}) => {
              try{
                const updatedUser = await User.findOneAndUpdate(
                  { _id: user._id },
                  { $pull: { savedBooks: { bookId: bookId } } },
                  { new: true }
                );
                if(!updatedUser){
                  throw new AuthenticationError('No user with this ID');
                }
                return updatedUser;
              }catch(err){
                console.log(err);
                throw new AuthenticationError('${err}');
              }
            },

},

}

    module.exports = resolvers;