import { AnyData, ServerResponse } from "../types";

export const responseHelper = (message: string, results: AnyData | null = null): ServerResponse => {
    if (!results) return { message };
    return { message, results };
};