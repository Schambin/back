// npm start
import express, { Application } from 'express';
import { privateRoutes } from './src/routes/private/Users.ts';
import { publicRoutes } from './src/routes/public/Users.ts';
import { auth } from './src/middlewares/Auth.ts';
import cors from 'cors';

export const app: Application = express();
const port: Number = 3333;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:5173', 
        'https://localhost:5173/register'
    ]
}));

app.use("/p", auth, privateRoutes);
app.use("/", publicRoutes);

app.listen(port, () => {
    console.log(`Server at localhost:${port}`);
})