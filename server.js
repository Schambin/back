// npm run dev
import express from 'express';
import privateRoutes from './routes/private/Users.js'
import publicRoutes from './routes/public/Users.js'

export const app = express();
const port = 3333;

// Middleware to parse JSON request bodies
app.use(express.json());

app.use("/", privateRoutes)
app.use("/", publicRoutes)

app.listen(port, () => {
    console.log(`Server at localhost:${port}`)
});