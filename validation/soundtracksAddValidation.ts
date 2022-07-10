import { AudioPreview } from "../types";

export const soundtracksAddValidation = (soundtracks: AudioPreview[]) => {
    const errors: string[] = [];

    if (soundtracks.length === 0) {
        errors.push('Nie znaleziono danych.');
    }

    if (soundtracks.length > 0) {
        let isComposer = true;
        let isSizeOk = true;
        let isTitle = true;
        for (const { composer, size, title } of soundtracks) {
            if (!composer || typeof composer !== 'string' || composer.length <= 0 || composer.length > 100) {
                isComposer = false;
            }
            if (size > 7340032) {
                isSizeOk = false;
            }
            if (!title || typeof title !== 'string' || title.length <= 0 || title.length > 150) {
                isTitle = false;
            }
        }
        if (!isComposer) {
            errors.push('Kompozytor powinien zawierać od 1 do 100 znaków');
        }
        if (!isSizeOk) {
            errors.push('Rozmiar audio nie powinien przekraczać 7MB.');
        }
        if (!isTitle) {
            errors.push('Tytuł soundtracku powinien zawierać od 1 do 150 znaków.');
        }
    }

    return errors;
};