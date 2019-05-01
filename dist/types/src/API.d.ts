import { AxiosInstance } from "axios";
import { IAuthentication } from "./Authentication";
import { IConfiguration } from "./Configuration";
import { BodyType } from "./schemes/http/Body";
import { RequestMethod } from "./schemes/http/Request";
export interface IAPI {
    auth: IAuthentication;
    xhr: AxiosInstance;
    reset(): void;
    get<T extends any = any>(endpoint: string, params?: object): Promise<T>;
    post<T extends any = any>(endpoint: string, body?: BodyType, params?: object): Promise<T>;
    patch<T extends any = any>(endpoint: string, body?: BodyType, params?: object): Promise<T>;
    put<T extends any = any>(endpoint: string, body?: BodyType, params?: object): Promise<T>;
    delete<T extends any = any>(endpoint: string): Promise<T>;
    getPayload<T extends object = object>(): T;
    request<T extends any = any>(method: RequestMethod, endpoint: string, params?: object, data?: object, noEnv?: boolean, headers?: {
        [key: string]: string;
    }): Promise<T>;
}
export declare class API implements IAPI {
    private config;
    auth: IAuthentication;
    xhr: AxiosInstance;
    constructor(config: IConfiguration);
    /**
     * Resets the client instance by logging out and removing the URL and project
     */
    reset(): void;
    /**
     * GET convenience method. Calls the request method for you
     */
    get<T extends any = any>(endpoint: string, params?: object): Promise<T>;
    /**
     * POST convenience method. Calls the request method for you
     */
    post<T extends any = any>(endpoint: string, body?: BodyType, params?: object): Promise<T>;
    /**
     * PATCH convenience method. Calls the request method for you
     */
    patch<T extends any = any>(endpoint: string, body?: BodyType, params?: object): Promise<T>;
    /**
     * PUT convenience method. Calls the request method for you
     */
    put<T extends any = any>(endpoint: string, body?: BodyType, params?: object): Promise<T>;
    /**
     * DELETE convenience method. Calls the request method for you
     */
    delete<T extends any = any>(endpoint: string): Promise<T>;
    /**
     * Gets the payload of the current token, return type can be generic
     */
    getPayload<T extends object = object>(): T;
    /**
     * Perform an API request to the Directus API
     */
    request<T extends any = any>(method: RequestMethod, endpoint: string, params?: object, data?: object, noEnv?: boolean, headers?: {
        [key: string]: string;
    }): Promise<T>;
}
//# sourceMappingURL=API.d.ts.map