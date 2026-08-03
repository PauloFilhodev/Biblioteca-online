export interface ApiError {
    code: string,
    message: string
};

export interface ApiSucess<T = unknown> {
    message: string,
    data?: T
};