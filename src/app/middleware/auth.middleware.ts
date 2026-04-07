import type { Request, Response, NextFunction } from 'express';

import ApiError from '../utils/api-error.js';
import { verifyUserToken } from '../utils/token.js';


export function authMiddleware() {
    return function (req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];

        if (!authHeader) next();

        if (!authHeader?.startsWith('Bearer ')) {
            throw ApiError.unauthorized("Invalid authorization header format");
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            throw ApiError.unauthorized("Token missing");
        }

        const user = verifyUserToken(token);

        if (!user) {
            throw ApiError.unauthorized("Invalid or expired token");
        }

        // @ts-ignore
        req.user = user; // Attach user info to the request object for downstream use
        next();
    }
}

export function restrictToAuthenticated() {
    return function (req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        if (!req.user) {
            throw ApiError.unauthorized("Authentication required");
        }
        return next();
    }
}