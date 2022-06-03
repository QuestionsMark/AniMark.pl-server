import { AnyData, ServerApiResponse, ServerResponse } from "../types";

export const responseHelper = (message: string, results: AnyData | null = null): ServerResponse => {
    if (!results) return { message };
    return { message, results };
};

export const responseApiHelper = (results: AnyData | null, amount: number | null = null): ServerApiResponse => {
    if (!amount) return { results };
    return { results, amount };
};