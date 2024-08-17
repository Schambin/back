import express from 'express';
import { genSalt, hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';

export const router = express.Router();
const prisma = new PrismaClient()

//SignIn
router.post('/signin', async (req, res) => {
    try {
        const user = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                email: user.email,
            },
        })

        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(user.password, salt);

        const userDB = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: hashedPassword,
            },
        })

        res.status(201).json(userDB);
    } catch (err) {
        console.error('Erro ao tentar criar o usuário:', err);
        res.status(501).json({ message: 'Erro no servidor. Tente novamente mais tarde' });
    }
})
