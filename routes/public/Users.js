import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();
const JWTSecrect = process.env.JWT_SECRET_KEY;

//Register
router.post('/register', async (req, res) => {
    try {
        const user = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        const userDB = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
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
router.post('/signin', async (req, res) => {
    try {
        const userData = req.body;
        const userDbData = await prisma.user.findUnique({
            where: {
                email: userData.email,
            },
        });

        if (!userDbData) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isPasswordCorrect = await bcrypt.compare(userData.password, userDbData.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid Password' });  //Wrong passw
        }

        //jwt
        const token = jwt.sign({ id: userDbData.id }, JWTSecrect, { expiresIn: '1m' });

        return res.status(200).json({ userDbData, token });

    } catch (err) {
        console.error('Error while trying to login:', err);
        res.status(500).json({ message: 'Server error. try again later.' });
    }
});

export default router;
