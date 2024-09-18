import express, { Response } from 'express';
import { PrismaClient } from '@prisma/client';

export const router = express.Router();
const prisma = new PrismaClient();

router.get('/list-users', async (res: Response) => {
    try {
        const users = await prisma.user.findMany({
        //Select which data from users table will return. Change to boolean
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
            },
        });

        res.status(200).json(users);

    } catch (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ message: 'Error fetching users' });
    }
});