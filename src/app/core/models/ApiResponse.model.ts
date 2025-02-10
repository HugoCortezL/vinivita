export enum ApiResponseStatus {
    Error = "Error",
    Success = "success"
}

interface ApiResponseData<T = any> {
    message: string,
    value?: T;
}

export interface ApiResponse<T = any> {
    statusCode: number;
    status: ApiResponseStatus;
    data: ApiResponseData<T>;
    timestamp: string;
}