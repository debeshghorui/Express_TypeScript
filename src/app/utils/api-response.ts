import type { Response } from 'express';

class ApiResponse {

    static success(res: Response, message = 'ok', data: object) {
        res.status(200).json({
            success: true,
            message,
            data
        })
    }

    static created(res: Response, message = 'ok', data: object) {
        res.status(201).json({
            success: true,
            message,
            data
        })
    }

    static noContent(res: Response, message = 'ok') {
        res.status(204).json({
            success: true,
            message
        })
    }
}

export default ApiResponse;