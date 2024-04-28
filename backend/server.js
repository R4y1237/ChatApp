import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js"

// express app
const app  = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use("/api/auth",authRoutes);

//listen for requests
app.listen(PORT,() => console.log(`Server Running on ${PORT}`));