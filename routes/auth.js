const express = require('express');
const passport = require('passport');

const router = express.Router();

// LOGIN WITH GITHUB
router.get(
  '/github',
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Login with GitHub'
    #swagger.description = 'Starts the GitHub OAuth authentication process.'

    #swagger.responses[302] = {
      description: 'Redirects the user to GitHub for authentication'
    }
  */
  passport.authenticate('github', { scope: ['user:email'] })
);

// GITHUB CALLBACK
router.get(
  '/github/callback',
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'GitHub OAuth callback'
    #swagger.description = 'Callback used by GitHub after successful authentication.'

    #swagger.responses[302] = {
      description: 'Redirects to the authenticated user profile'
    }
    #swagger.responses[401] = {
      description: 'GitHub authentication failed'
    }
  */
  passport.authenticate('github', {
    failureRedirect: '/auth/login-failed'
  }),
  (req, res) => {
    res.redirect('/auth/profile');
  }
);

// AUTHENTICATED USER PROFILE
router.get(
  '/profile',
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Get authenticated user'
    #swagger.description = 'Returns the currently authenticated GitHub user.'

    #swagger.responses[200] = {
      description: 'Authentication successful'
    }
    #swagger.responses[401] = {
      description: 'Authentication required'
    }
  */
  (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        message: 'You must be logged in'
      });
    }

    res.status(200).json({
      message: 'Authentication successful',
      user: {
        id: req.user.id,
        username: req.user.username,
        displayName: req.user.displayName
      }
    });
  }
);

// LOGIN FAILURE
router.get(
  '/login-failed',
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'GitHub authentication failure'
    #swagger.description = 'Returns an error when GitHub OAuth authentication fails.'

    #swagger.responses[401] = {
      description: 'GitHub authentication failed'
    }
  */
  (req, res) => {
    res.status(401).json({
      message: 'GitHub authentication failed'
    });
  }
);

// LOGOUT
router.get(
  '/logout',
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Logout'
    #swagger.description = 'Logs out the authenticated user and destroys the session.'

    #swagger.responses[200] = {
      description: 'Logged out successfully'
    }
  */
  (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }

      req.session.destroy(() => {
        res.status(200).json({
          message: 'Logged out successfully'
        });
      });
    });
  }
);

module.exports = router;