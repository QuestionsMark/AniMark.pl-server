import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config";
import { Token } from "../types";
import { adminAuth, everyoneAuth, moderatorsAuth, usersAuth } from "../utils/authorizationHelper";
import { AuthorizationError } from "./error";

export const requestAuthorization = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const parts = req.path.slice(1).split('/');
        if (req.method === 'GET') {
            if (parts[0] === 'users' && parts[2] === 'privacy') {
                const token = req.headers.token;
                if (!token) throw new AuthorizationError('Brak tokenu dostępu.');
                verify(req.headers.token as string, TOKEN_SECRET) as Token;
                return next();
            }
            return next();
        } else {
            const token = req.headers.token;
            if (everyoneAuth(parts, req.method)) {
                return next();
            }
            if (!token) throw new AuthorizationError('Brak tokenu dostępu.');
            const verified = verify(req.headers.token as string, TOKEN_SECRET) as Token;
            if (usersAuth(parts, req.method)) {
                if (!([0, 1, 2].includes(verified.rank))) throw new AuthorizationError('Brak autoryzacji.');
                return next();
            }
            if (moderatorsAuth(parts, req.method)) {
                if (!([1, 2].includes(verified.rank))) throw new AuthorizationError('Brak autoryzacji.');
                return next();
            }
            if (adminAuth(parts, req.method)) {
                if (!([2].includes(verified.rank))) throw new AuthorizationError('Brak autoryzacji.');
                return next();
            }
        }
        next();
    }
}