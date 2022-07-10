import { ProfileEditEntity } from "../types/formEntities";

export const profileEditValidation = (form: ProfileEditEntity): string[] => {
    const errors: string[] = [];
    const { introduction, username, favoriteType, profileBackground } = form;

    if (!introduction.title || typeof introduction.title !== 'string' || introduction.title.length < 1 || introduction.title.length > 150) {
        errors.push('Tytuł opisu powinien zawierać od 1 do 150 znaków.');
    }

    if (!introduction.description || typeof introduction.description !== 'string' || introduction.description.length < 1 || introduction.description.length > 10000) {
        errors.push('Opis powinien zawierać od 1 do 10000 znaków.');
    }

    if (!username || typeof username !== 'string' || username.length < 1 || username.length > 25) {
        errors.push('Opis powinien zawierać od 1 do 25 znaków.');
    }

    return errors;
};