// import dependencies
const router = require('express').Router();

// import controllers
const homeController = require('../modules/home/home.controller');
const usersController = require('../modules/users/users.controllers');
const tokensController = require('../modules/tokens/tokens.controllers');

// import middleware
const bearerMiddleware = require('../middlewares/bearer');

// main route
router.get('/', homeController.ping);

// auth route (public)
router.post('/api/v1/auth/register', usersController.register);
router.post('/api/v1/auth/login', usersController.login);
router.get('/api/v1/auth/refresh', tokensController.refresh);

// profile route (authenticated only)
router.get('/api/v1/profile', bearerMiddleware, usersController.getProfile);

// export router
module.exports = router;
