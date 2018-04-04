export class ResponseError {
    code: number;
    message: string;
    name: string;
    status: number;
}

export class Response {
    success: boolean;
    message?: ResponseError;
    data?: any;
}