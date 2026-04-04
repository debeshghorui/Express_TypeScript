import jwt from 'jsonwebtoken';

interface TokenPayload {
    userId: string;
}

export const createUserToken = (payload: TokenPayload) => {

    const secret = process.env.JWT_SECRET || 'default_secret';
    const expiresIn: NonNullable<jwt.SignOptions['expiresIn']> = (process.env.JWT_EXPIRES_IN as NonNullable<jwt.SignOptions['expiresIn']>) || '15m';

    return jwt.sign(payload, secret, { expiresIn });
}

export const verifyUserToken = (token: string): TokenPayload | null => {

    const secret = process.env.JWT_SECRET || 'default_secret';
    try {
        const decoded = jwt.verify(token, secret) as TokenPayload;
        return decoded;
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
}