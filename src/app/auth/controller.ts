import { createHmac, randomBytes, } from 'node:crypto';
import type { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { usersTable as users } from '../../db/schema.js';

import ApiResponse from '../utils/api-response.js';
import ApiError from '../utils/api-error.js';
import { signupPayloadSchema } from './models.js';
import { db } from '../../db/index.js';

class AuthController {
    public async signup(req: Request, res: Response) {
        const validationResult = await signupPayloadSchema.safeParseAsync(req.body);

        // Log the validation result for debugging purposes
        if (process.env.NODE_ENV === 'development') console.log(validationResult);

        if (validationResult.error) {
            throw ApiError.badRequest(validationResult.error.issues.map(issue => issue.message).join(', '));
        }

        const { firstName, lastName, email, password } = validationResult.data;

        const user = await db.select().from(users).where(eq(users.email, email));

        if (user.length > 0) return ApiError.conflict("Email already exists");

        // Generate a random salt for the user
        const salt = randomBytes(32).toString('hex');
        // Hash the password with the salt using HMAC
        const hashPassword = createHmac('sha256', salt).update(password).digest('hex');

        const newUser = await db.insert(users).values({
            firstName,
            lastName,
            email,
            password: hashPassword,
            salt,
        }).returning({ id: users.id });

        return ApiResponse.created(res, "User created successfully", { id: newUser[0]?.id });
    }
}

export default AuthController;