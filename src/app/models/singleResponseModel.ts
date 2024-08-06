export interface SingleResponseModel<T> extends Response {
    data: T;
}