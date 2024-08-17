import express from "express"
import { login, register } from "../modules/auth/controllers/index.js"

const router = express.Router()

router.post('/login', login)
router.post('/register', register)

export default router
