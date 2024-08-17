import express from "express";
import morgan from "morgan";
import cors from "cors"
import bodyParser from "body-parser";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import threadRouter from "./routes/thread.js";
import { auth } from "./middlewares/auth.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('combined'))
app.use(cors({ origin: '*' }))
app.use(bodyParser.json({ type: 'application/*+json' }))

// routers
app.use('/api/auth', authRouter)
app.use('/api/user', auth, userRouter)
app.use('/api/thread', auth, threadRouter)

app.listen(3000)
