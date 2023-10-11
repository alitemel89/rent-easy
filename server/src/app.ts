// src/app.ts
import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import cors from "cors";
import "./config/database";
import authRoutes from "./routes/authRoutes";
import loginRoutes from "./routes/loginRoutes";
import rentalRoutes from './routes/rentalRoutes'; // Import the rental routes
import userRoutes from './routes/userRoutes'; // Import the rental routes

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/auth", loginRoutes);

app.use('/api/rentals', rentalRoutes);
app.use('/api/profile', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
