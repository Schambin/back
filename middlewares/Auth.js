import jwt from 'jsonwebtoken';

const JWTSecrect = process.env.JWT_SECRET_KEY;

export const auth = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWTSecrect);
        req.user = decoded;

        next();
    } catch (err) {
        console.error('Error validating token:', err);
        return res.status(401).json({ message: 'Invalid token' });
    }
};
