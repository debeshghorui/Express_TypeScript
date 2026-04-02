import { createHmac, randomBytes, } from 'node:crypto';
import type { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { usersTable as users } from '../../db/schema.js';

import ApiResponse from '../utils/api-response.js';
import ApiError from '../utils/api-error.js';
import { signupPayloadModel, signinPayloadModel } from './models.js';
import { db } from '../../db/index.js';

class AuthController {
    public async signup(req: Request, res: Response) {
        const validationResult = await signupPayloadModel.safeParseAsync(req.body);

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

    public async signin(req: Request, res: Response) {
        const validationResult = await signinPayloadModel.safeParseAsync(req.body);

        // Log the validation result for debugging purposes
        if (process.env.NODE_ENV === 'development') console.log(validationResult);
        if (validationResult.error) {
            throw ApiError.badRequest(validationResult.error.issues.map(issue => issue.message).join(', '));
        }

        const { email, password } = validationResult.data;

        const [user] = await db.select().from(users).where(eq(users.email, email));

        if (!user) return ApiError.notFound("User not found");

        const salt = user.salt!;
        const hashPassword = createHmac('sha256', salt).update(password).digest('hex');

        if (hashPassword !== user.password) {
            return ApiError.unauthorized("Invalid credentials");
        }

        // TODO: Generate access and refresh tokens here (e.g., using JWT)

        return ApiResponse.success(res, "User signed in successfully", { 
            id: user.id,
            accessToken: "dummy-access-token", // TODO: generate a JWT or similar token here
            refreshToken: "dummy-refresh-token" // TODO: generate a refresh token here
        });
    }
}

export default AuthController;