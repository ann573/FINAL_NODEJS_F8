
export const validateBody = (schema) => (req, res, next) =>  {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        const err = error.errors.map((item) => `${item.path}: ${item.message}`)
        return res.status(400).json({err})
    }
}   