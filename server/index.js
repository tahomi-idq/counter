import express from "express";
import { connect } from "mongoose";
import { router } from "./routes/routes.js";
import cors from "cors";
import { createNewCounter, getCurrentCount } from "./functions/counterActions.js";
import { counterClearInterval } from './config.js'
import { authRouter } from "./routes/authRoutes.js";

const app = express();
const uri = "";

const PORT = process.env.PORT || 3333;

app.use(cors({
    origin:"*",
    methods:['GET', 'POST']
}));
app.use(express.json());

app.use(router);
app.use('/auth', authRouter);

async function start() {
    await connect(uri)
    .then((res)=>{console.log("connected to db");})
    .catch((err)=>{
        console.log(err);
    })

    const lastCount = await getCurrentCount();

    if(lastCount == null) {
        createNewCounter();
        console.log("Created first counter");
    }

    app.listen(PORT, (err) => {
        err ? console.log(err) : console.log(`listening port ${PORT}`);
    });

    setInterval(()=>{
        createNewCounter();
    }, counterClearInterval)
}

start()