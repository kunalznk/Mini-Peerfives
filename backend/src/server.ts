require("dotenv").config()
import express, { Request, Response } from "express"
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import  mongo  from "./config/db";
import rewardRoutes from "./routes/rewardRoutes";

const app = express();

mongo

app.use(cors({
    origin:"*"
}))

app.use(express.json());

app.use("/users", userRoutes);
app.use("/rewards", rewardRoutes)


app.get("/test" , (_req: Request, res: Response) => {
    res.status(200).json("Server is Running")
})

app.listen(+process.env.HTTP_PORT!  || 3000 , () => {
    console.log("Servier is listening on port ", +process.env.HTTP_PORT! || 3000)
})