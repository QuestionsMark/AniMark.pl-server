import { NewsFormEntity } from "../types/formEntities";

export const newsCreateValidation = (form: NewsFormEntity): string[] => {
    const errors: string[] = [];
    const { choosedImages, description, images, otherLinks, preview, title, videos } = form;

    if (typeof description !== 'string' || description.length < 1 || description.length > 10000) {
        errors.push('Opis powinien zawierać od 1 do 10000 znaków.');
    }

    if (typeof title !== 'string' || title.length < 1 || title.length > 150) {
        errors.push('Tytuł powinien zawierać od 1 do 150 znaków.');
    }

    let otherLinkError = false;
    for (const { note, src } of otherLinks) {
        if (typeof note !== 'string' || typeof src !== 'string' || note.length < 1 || note.length > 150 || src.length < 1) {
            otherLinkError = true;
        }
    }
    if (otherLinkError) {
        errors.push('Odnośniki powinny zawierać link oraz tytuł linku nieprzekraczający 150 znkaów.');
    }

    let videosError = false;
    for (const src of videos) {
        if (typeof src !== 'string' || src.length < 1) {
            videosError = true;
        }
    }
    if (videosError) {
        errors.push('Podaj link !SHARE! do filmu YouTube.');
    }

    if ((choosedImages.length + preview.length) < 1 || (choosedImages.length + preview.length) > 5) {
        errors.push('Artykuł powinien zawierać od 1 do 5 grafik.');
        errors.push(`Grafiki powinny ważyć nie więcej niż 0,5MB.`);
    }
    if (images || preview.length > 1) {
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