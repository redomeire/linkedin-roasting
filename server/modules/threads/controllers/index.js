import jwt from "jsonwebtoken";
import { prisma } from "../../../../prisma/client.js";
import { model } from "../../../utils/generativeAI.js";

const postThread = async (req, res) => {
    try {
        const authorization = req.headers.authorization
        const decodedToken = jwt.decode(
            authorization.replace('Bearer ', ''),
            process.env.TOKEN_SECRET
        )
        const { username } = req.body
        console.log("username : " + JSON.stringify(req.body))

        // checking maximum thread count (5)
        const threads = await prisma.thread.findMany({
            where: {
                userId: decodedToken.id
            }
        })

        if (threads.length === 5) {
            return res.status(400).send({
                success: false,
                message: 'Maximum thread count reached'
            })
        }

        const newThread = await prisma.thread.create({
            data: {
                question: {
                    create: {
                        text: username
                    }
                },
                user: {
                    connect: {
                        id: decodedToken.id
                    }
                }
            }
        })

        if (!newThread) {
            return res.status(400).send({
                success: false,
                message: 'Error creating new thread'
            })
        }

        // post to Gemini SDK
        const prompt = `Tolong roasting profile linkedin dengan username ${username}. Berikan respon dalam 1 kalimat saja`

        const result = await model.generateContent(prompt)
        const response = result.response
        const text = response.text()

        if (!response) {
            return res.status(400).send({
                success: false,
                message: 'Error creating new answer'
            })
        }
        const newAnswer = await prisma.answer.create({
            data: {
                text,
                thread: {
                    connect: {
                        id: newThread.id
                    }
                }
            }
        })

        return res.status(200).send({
            success: true,
            thread: newThread,
            message: 'success create new thread',
            answer: newAnswer
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal server error'
        })
    }
}

export { postThread }
