// import dependencies
const router = require('express').Router();

// import controllers
const homeController = require('../modules/home/home.controller');
const usersController = require('../modules/users/users.controllers');

// main route
router.get('/', homeController.ping);

// users route
router.post('/api/v1/register', usersController.register);
router.post('/api/v1/login', usersController.login);

// export router
module.exports = router;