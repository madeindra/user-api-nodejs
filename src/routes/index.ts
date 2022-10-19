// import dependencies
import { Router } from 'express';

// import  swagger
import swagger from 'swagger-ui-express';
import openapi from '../docs/openapi.json';

// import controllers
import homeController from '../modules/home/home.controller';
import usersController from '../modules/users/users.controllers';
import tokensController from '../modules/tokens/tokens.controllers';

// import middleware
import bearerMiddleware from '../middlewares/bearer';
import adminOnly from '../middlewares/admin';

// initialize router
const router = Router();

// main route
router.get('/', homeController.ping);

// migrate admin credential (to create admin)
router.get('/migrate', usersController.migrate);

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

// doc route
router.use('/docs', swagger.serve, swagger.setup(openapi));

// export router
export default router;
