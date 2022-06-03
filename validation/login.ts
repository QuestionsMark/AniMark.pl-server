export interface LoginFormEntity {
    login: string;
    password: string;
}

export const defaultLoginForm: LoginFormEntity = {
    login: '',
    password: '',
};

export const loginValidation = (form: LoginFormEntity) => {
    const errors: string[] = [];
    const { login, password } = form;

    if (!login || typeof login !== 'string' || login.length > 150) {
        errors.push('Login powinien być ciągniem znaków o długości nie większej niż 150.');
    }

    if (!password || typeof password !== 'string' || password.length > 150 || password.indexOf(' ') !== -1) {
        errors.push('Hasło powinno być ciągniem znaków o długości nie większej niż 150 i nie może zawierać spacji.');
    }

    return errors;
};