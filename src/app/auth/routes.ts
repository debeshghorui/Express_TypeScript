import express from 'express';
import type { Router } from 'express';

import AuthController from './controller.js';
import { restrictToAuthenticated } from '../middleware/auth.middleware.js';

// Create an instance of the AuthController
const authController = new AuthController();

const router: Router = express.Router();

router.post('/signup', authController.signup.bind(authController));
router.post('/signin', authController.signin.bind(authController));

router.get('/profile', restrictToAuthenticated(), authController.profile.bind(authController));

export default router;