module.exports.log = (req, res, next) => {
    console.log('Logging....')
    next()
}