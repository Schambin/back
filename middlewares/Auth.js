import jwt from 'jsonwebtoken';

const JWTSecrect = process.env.JWT_SECRET_KEY;

export const auth = (req, res, next) => {

    const token = req.params
    console.log(token);

}

