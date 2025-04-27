const asyncHandler = (originalController) => {
    return (req, res, next) => {
        Promise.resolve(originalController(req, res, next))
        .catch((err) => next(err))
    }
}

export default asyncHandler;