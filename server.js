// npm run dev
import express from 'express';
import { router } from './routes/Users.js';

export const app = express();
const port = 3333;

// Middleware to parse JSON request bodies
app.use(express.json());

app.listen(port, () => {
    console.log(`Server at localhost:${port}`)
});

app.use("/", router)