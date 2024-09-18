import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

export const publicRoutes = express.Router();
const prisma = new PrismaClient();
const JWTSecrect = process.env.JWT_SECRET_KEY as string;

//Register
publicRoutes.post('/register', async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userDB = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            },
        });

        res.status(201).json(userDB);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Server error. try again later.' });
    }
});

//Login
publicRoutes.post('/signin', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const userDbData = await prisma.user.findUnique({
            where: { email },
        });

        if (!userDbData) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, userDbData.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        //jwt auth
        const token = jwt.sign({ id: userDbData.id }, JWTSecrect, { expiresIn: '1m' });

        return res.status(200).json({ userDbData, token });

    } catch (err) {
        console.error('Error while trying to login:', err);
        res.status(500).json({ message: 'Server error. try again later.' });
    }
});