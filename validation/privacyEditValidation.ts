import { PrivacyEditEntity } from "../types/formEntities";

export const privacyEditValidation = (state: PrivacyEditEntity): string[] => {
    const errors: string[] = [];
    const { email, login, password, passwordAgain, passwordConfirm } = state;

    if (!email || typeof email !== 'string' || email.indexOf('@') === -1 || email.length > 400) {
        errors.push('Podaj prawidłowy email.');
    }

    if (!login || typeof login !== 'string' || login.length > 150) {
        errors.push('Login powinien być ciągniem znaków o długości nie większej niż 150.');
    }

    if (password) {
        if (!password || typeof password !== 'string' || password.length > 150 || password.indexOf(' ') !== -1) {
            errors.push('Hasło powinno być ciągniem znaków o długości nie większej niż 150 i nie może zawierać spacji.');
        }
    }

    if (password !== passwordAgain) {
        errors.push('Powtórzone hasło nie jest identyczne.');
    }

    if (!passwordConfirm || typeof passwordConfirm !== 'string' || passwordConfirm.length > 150) {
        errors.push('Do aktualizacji prywatnych danych wymagane jest podanie obecnego hasła.');
    }

    return errors;
};