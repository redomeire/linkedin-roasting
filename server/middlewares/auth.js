import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        if (!req.headers['authorization']) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized'
            })
        }

        const authorization = req.headers.authorization
        const token = authorization.replace('Bearer ', '')

        jwt.verify(token, process.env.TOKEN_SECRET)

        next()
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).send({
                success: false,
                message: 'invalid token provided'
            })
        }
        return res.status(500).send({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }
}

export { auth }
