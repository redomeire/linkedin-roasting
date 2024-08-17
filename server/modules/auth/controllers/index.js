import { prisma } from "../../../../prisma/client.js"
import argon from "argon2"
import jwt from "jsonwebtoken"

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await prisma.user.findFirst({ where: { email } })
    if (!user) {
        return res.status(404).send({
            success: false,
            message: 'User not found'
        })
    }
    const validPassword = await argon.verify(user.password, password)
    if (!validPassword) {
        return res.status(400).send({
            success: false,
            message: 'Wrong password'
        })
    }
    const profile = await prisma.profile.findFirst({ where: { userId: user.id } })
    const token = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email
    }, process.env.TOKEN_SECRET, { expiresIn: '1d' })

    return res
        .status(200)
        .header('auth-token', token)
        .send({
            success: true,
            profile,
            token
        })
}

const register = async (req, res) => {
    console.log(req.body)
    try {
        const { email, name, password } = req.body

        // find if email already exist
        const userWithExistingEmail = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (userWithExistingEmail) {
            return res.status(400).send({
                success: false,
                message: 'Email already exist'
            })
        }

        const hashedPassword = await argon.hash(password)

        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                profile: {
                    create: {
                        bio: ''
                    }
                }
            }
        })

        return res.status(200).send({
            success: true,
            message: 'User created successfully',
            user: newUser
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server error'
        })
    }
}

export {
    login,
    register
}
