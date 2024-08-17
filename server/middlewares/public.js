const publicMiddleware = async (_, _, next) => {
    return next()
}

export { publicMiddleware as public }
