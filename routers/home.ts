import { Router } from "express";
import { sign, verify } from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config";
import { ValidationError } from "../middlewares/error";
import { UserRecord } from "../records";
import { AuthorizationAPI, LoginAPI, Token } from "../types";
import { responseHelper } from "../utils/responseHelper";

export const homeRouter = Router();

homeRouter
    .get('/', (req, res) => {
        res.json({
            status: 'OK',
            message: 'Hello clever programmers from AniMark.pl',
        });
    })


    // Autoryzacja
    .get('/authorization/:token', (req, res) => {
        const verified = verify(req.params.token, TOKEN_SECRET);
        const { rank, userId } = verified as Token;
        res.status(200).json(responseHelper('Autoryzacja.', { rank, userId } as AuthorizationAPI));
    })


    // Logowanie
    .post('/login', async (req, res) => {
        const { login, password } = req.body as LoginAPI;

        const user = await UserRecord.findByLogin(login);
        if (!user) {
            throw new ValidationError('Błędny login lub hasło.');
        }

        const matches = await user.passwordMatches(password);
        if (!matches) {
            throw new ValidationError('Błędny login lub hasło.');
        }

        const { _id: userId, rank } = user;
        const token = sign(
            { userId, rank },
            TOKEN_SECRET,
            { expiresIn: '720h' },
        );
        res.status(200).json(responseHelper('Autoryzacja.', { token } as AuthorizationAPI));
    })