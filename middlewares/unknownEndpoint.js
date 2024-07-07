const unknownEndpoint = (request, response) => {
    response.status(400).json(`Unknown endpoint`)
}

module.exports = unknownEndpoint