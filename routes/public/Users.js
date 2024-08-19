import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient()
const JWTSecrect = process.env.JWT_SECRET_KEY

//Register
router.post('/register', async (req, res) => {
    try {
        const user = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                email: user.email,
                password: user.password,
            },
        })

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
        })

        res.status(201).json(userDB);
    } catch (err) {
        console.error('Erro ao tentar criar o usuário:', err);
        res.status(501).json({ message: 'Erro no servidor. Tente novamente mais tarde' });
    }
})

//Login
router.post('/signin', async (req, res) => {
    try {
        const userData = req.body;
        const userAlreadyExists = await prisma.user.findUnique({
            where: {
                email: userData.email
            },
        })

        // console.log(`User provided password: ${userData.password}`)
        // console.log(`DB password provided: ${userAlreadyExists.password}`)

        if (!userAlreadyExists) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const isPasswordCorrect = await bcrypt.compare(userData.password, userAlreadyExists.password)
        // console.log(`Is password correct: ${isPasswordCorrect}`)

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid Password' });  // Senha incorreta
        }

        //jwt
        const token = jwt.sign({ id: userData.id }, JWTSecrect, { expiresIn: '30m' })

        return res.status(200).json({ userAlreadyExists, token })

    } catch (err) {
        console.error('Erro ao tentar fazer login:', err);
        res.status(501).json({ message: 'Erro no servidor. Tente novamente mais tarde' });
    }
})