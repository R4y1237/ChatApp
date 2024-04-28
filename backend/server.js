import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js"
import connectToDB from "./db/connectdb.js";

// express app
const app  = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(express.json()); //to parse requests with JSON payload from req.body

app.use("/api/auth",authRoutes);

//listen for requests
app.listen(PORT,() => {
    connectToDB();
    console.log(`Server Running on ${PORT}`)
});