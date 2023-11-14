const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, "../../.env")});


// const secret = 'mysecretssshhhhhhh';
// const expiration = '2h';

module.exports = {
    AuthenticationError: new GraphQLError('Could not authenticate user.', {
        extensions: {
            code: 'UNAUTHENTICATED',
        },
    }),
    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;
    
        if (req.headers.authorization) {
          token = token.split(' ').pop().trim();
        }
    
        if (!token) {
          return req;
        }
    
        try {
          const { data } = jwt.verify(token, process.env.SESSION_SECRET, { maxAge: process.env.SESSION_EXPIRATION });
          req.user = data;
        } catch {
          console.log('Invalid token');
        }
    
        return req;
      },
      signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };
        console.log(process.env.SESSION_SECRET);
        return jwt.sign({ data: payload }, process.env.SESSION_SECRET, { expiresIn: process.env.SESSION_EXPIRATION });
    },
};
