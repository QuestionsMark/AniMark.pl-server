import { AnyData, ServerApiResponse, ServerErrorResponse, ServerResponse, SocketErrorResponse } from "../types";

export const responseHelper = (message: string, results: AnyData | null = null): ServerResponse => {
    if (!results) return { message };
    return { message, results };
};

export const responseApiHelper = (results: AnyData | null, amount: number | null = null): ServerApiResponse => {
    return amount === null ? { results } : { results, amount };
};

export const socketResponseErrorHelper = (message: string, validation: string[] = null): SocketErrorResponse => {
    if (!validation) return { message, status: false };
    return { message, status: false, validation };
};