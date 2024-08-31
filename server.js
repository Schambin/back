// npm start
import express from 'express';
import privateRoutes from './routes/private/Users.js';
import publicRoutes from './routes/public/Users.js';
import { auth } from './middlewares/Auth.js';
import cors from 'cors';

export const app = express();
const port = 3333;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors('http://localhost:5173', 'https://localhost:5173/register'));

app.use("/p", auth, privateRoutes);
app.use("/", publicRoutes);

app.listen(port, () => {
    console.log(`Server at localhost:${port}`);
})