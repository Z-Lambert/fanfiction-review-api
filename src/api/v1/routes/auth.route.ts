import express from 'express';

import { loginUserHandler, registerUserHandler } from '../controllers';

const router = express.Router();

// Log in a user
router.post('/login', loginUserHandler);

// Register a new user
router.post('/register', registerUserHandler);

export default router;
