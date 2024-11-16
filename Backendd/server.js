import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import userRouter from "./routes/user.routes.js"
import roleRouter from "./routes/role.route.js"
import authRouter from "./routes/auth.routes.js"
import guestListRouter from "./routes/guestlist.routes.js"
import ribbonRouter from "./routes/ribbons.routes.js"
import cors from "cors";


dotenv.config();


const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Hier kannst du die URL deiner React-App angeben
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Definiere erlaubte HTTP-Methoden
  allowedHeaders: ['Content-Type', 'Authorization'] // Definiere erlaubte Header
}));

app.use(express.json());



connectToDB()
.then(() => {

    app.use('/users', userRouter);
    app.use('/roles', roleRouter);
    app.use('/auth', authRouter);
    app.use('/guestlists', guestListRouter);  // Corrected route path
    app.use('/ribbons', ribbonRouter);       // Corrected route path

    // Start the server
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
