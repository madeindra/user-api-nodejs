// import dependencies
const router = require('express').Router();

// import controllers
const homeController = require('../modules/home/home.controller');

// main route
router.get('/', homeController.ping);

// export router
module.exports = router;