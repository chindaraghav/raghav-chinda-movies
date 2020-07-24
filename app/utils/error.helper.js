function getErrorMessage(error = {}) {
    return error.message ? error.message : "Something went wrong!"
}

export { getErrorMessage };