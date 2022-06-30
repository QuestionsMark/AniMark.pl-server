import { ProjectCreateEntity } from "../types/formEntities";

export const projectCreateValidation = (state: ProjectCreateEntity): string[] => {
    const errors: string[] = [];
    const { description, images, links, name, otherLinks, preview } = state;

    if (typeof description !== 'string' || description.length < 1 || description.length > 10000) {
        errors.push('Opis powinien zawierać od 1 do 10000 znaków.');
    }

    if (typeof name !== 'string' || name.length < 1 || name.length > 150) {
        errors.push('Nazwa powinna zawierać od 1 do 150 znaków.');
    }

    let otherLinkError = false;
    for (const { note, src } of [...otherLinks, ...links]) {
        if (typeof note !== 'string' || typeof src !== 'string' || note.length < 1 || note.length > 150 || src.length < 1) {
            otherLinkError = true;
        }
    }
    if (otherLinkError) {
        errors.push('Odnośniki powinny zawierać link oraz tytuł linku nieprzekraczający 150 znkaów.');
    }

    if (!images || preview.length < 1) {
        errors.push('Projekt powinine zawierać conajmniej jedną grafikę.');
    }

    if (images || preview.length > 0) {
        let imageErrorsCount = 0;
        for (const { size, src } of preview) {
            if (typeof size !== 'number' || size > 524288 || typeof src !== 'string' || src.length < 1) {
                imageErrorsCount += 1;
            }
        }
        if (imageErrorsCount > 0) {
            errors.push(`Grafiki powinny ważyć nie więcej niż 0,5MB. Ilosć nieprawidłowych grafik: ${imageErrorsCount}`);
        }
    }

    return errors;
};