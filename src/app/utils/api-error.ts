class ApiError extends Error {
    constructor(statusCode: number, message: string) {
        super(message)
        //@ts-expect-error
        this.statusCode = statusCode;
        this.message = message;
        // @ts-expect-error
        this.isOperational = true;
        // TODO: Read NodeJS Docs
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message: string = "Bad Request") {
        return new ApiError(400, message);
    }

    static unauthorized(message: string = "Unauthorized") {
        return new ApiError(401, message);
    }

    static forbidden(message: string = "Forbidden") {
        return new ApiError(403, message);
    }

    static notFound(message: string = "Not Found") {
        return new ApiError(404, message);
    }

    static conflict(message: string = "Conflict") {
        return new ApiError(409, message);
    }

    static internalServerError(message: string = "Internal Server Error") {
        return new ApiError(500, message);
    }
}

export default ApiError;