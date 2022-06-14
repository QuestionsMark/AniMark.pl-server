import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export class ValidationError extends Error {
    errors?: string[];

    constructor(message: string, errors?: string[]) {
        super(message);
        this.errors = errors;
    }
};

export class SocketError extends Error {
    errors?: string[];

    constructor(message: string, errors?: string[]) {
        super(message);
        this.errors = errors;
    }
}

export interface MongooseError {
    message: string;
    code: number;
    keyValue: {
        username?: string;
        email?: string;
    };
}

export const errorRouter = (err: Error | MongooseError, req: Request, res: Response, next: NextFunction) => {
    console.error('O nie! Błąd: ', err);

    if ((err as MongooseError).code === 11000) {
        if ((err as MongooseError).keyValue.username) {
            return res.status(400).json({ message: 'Nazwa uzytkownika jest już zajęta.' });
        }

        if ((err as MongooseError).keyValue.email) {
            return res.status(400).json({ message: 'Email został już wykorzystany.' });
        }

        return res.status(400).json({ message: 'Przepraszamy spróbuj ponownie później.' });
    }

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