import { ResponseModel } from "./response";

export interface SingleResponseModel<T> extends ResponseModel {
    data: T;
}