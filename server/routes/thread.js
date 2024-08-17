import express from "express"
import { postThread } from "../modules/threads/controllers/index.js"

const router = express.Router()

router.post('/create', postThread)

export default router
