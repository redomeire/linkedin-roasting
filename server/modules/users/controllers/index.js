import { prisma } from "../../../../prisma/client.js"

const getProfile = async (req, res) => {
    try {
        const { id } = req.body
        const foundProfile = await prisma.profile.findUnique({ where: { userId: id } })

        if (!foundProfile) {
            return res.status(404).send({
                success: false,
                message: 'Profile not found'
            })
        }

        return res.status(200).send({
            success: true,
            profile: foundProfile
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Internal server error'
        })
    }
}

export { getProfile }
