import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export class ValidationError extends Error {
    errors?: string[];

    constructor(message: string, errors?: string[]) {
        super(message);
        this.errors = errors;
    }
};

export const errorRouter = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('O nie! Błąd: ', err.message);

    if (err instanceof TokenExpiredError) {
        return res.status(403).json({ message: 'Twoja sesja wygasła.' });
    }

    if (err instanceof JsonWebTokenError) {
        return res.status(400).json({ message: 'Nieprawidłowy token dostępu!' });
    }

    if (err instanceof ValidationError) {
        return res.status(400).json({ message: err.message, validation: err.errors });
    }
    res.status(500).json({ message: 'Przepraszamy, spróbuj ponownie później.' });
}