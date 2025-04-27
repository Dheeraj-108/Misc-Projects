export default function asyncHandler(controllerMethod) {
    return (req, res, next) => {
        Promise.resolve(controllerMethod(req, res, next))
        .catch((err) => next(err))
    }
}