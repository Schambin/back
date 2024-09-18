import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWTSecrect = process.env.JWT_SECRET_KEY as string;

interface DecodedToken {
    id: string;
    name: string;
    exp: number;
    iat: number;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWTSecrect) as  DecodedToken;
        req.user = decoded;

        next();
    } catch (err) {
        console.error('Error validating token:', err);
        return res.status(401).json({ message: 'Invalid token' });
    }
};
