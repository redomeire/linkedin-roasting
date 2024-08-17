import express from "express"
import { getProfile } from "../modules/users/controllers/index.js"

const router = express.Router()

router.get('/profile', getProfile)

export default router
