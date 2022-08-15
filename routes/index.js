// import dependencies
const router = require('express').Router();

// import controllers
const homeController = require('../modules/home/home.controller');
const usersController = require('../modules/users/users.controllers');
const tokensController = require('../modules/tokens/tokens.controllers');

// import middleware
const bearerMiddleware = require('../middlewares/bearer');
const adminOnly = require('../middlewares/admin');

// main route
router.get('/', homeController.ping);

// auth route (public)
router.post('/api/v1/auth/register', usersController.register);
router.post('/api/v1/auth/login', usersController.login);
router.post('/api/v1/auth/refresh', tokensController.refresh);

// user route (authenticated admin only)
router.post('/api/v1/users', bearerMiddleware, adminOnly, usersController.createUser);
router.get('/api/v1/users', bearerMiddleware, adminOnly, usersController.readAllUsers);
router.get('/api/v1/users/:id', bearerMiddleware, adminOnly, usersController.readOneUser);
router.put('/api/v1/users/:id', bearerMiddleware, adminOnly, usersController.updateUser);
router.delete('/api/v1/users/:id', bearerMiddleware, adminOnly, usersController.deleteUser);

// profile route (authenticated only)
router.get('/api/v1/profile', bearerMiddleware, usersController.getProfile);

// export router
module.exports = router;
