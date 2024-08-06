import { ResponseModel } from "./response";

export interface ListResponseModel<T> extends ResponseModel{
    data:T[];
}