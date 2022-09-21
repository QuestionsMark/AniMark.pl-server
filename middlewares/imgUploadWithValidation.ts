import { basename, extname } from 'path';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import { ValidationError } from './error';
import { AnimeCreateEntity, FormEntity, NewsEditEntity, NewsFormEntity, ProjectCreateEntity, ValidationType } from '../types/formEntities';
import { deleteFiles } from '../utils/deleteImages';
import { newsCreateValidation } from '../validation/newsCreateValidation';
import { animeCreateValidation } from '../validation/animeCreateValidation';
import { projectCreateValidation } from '../validation/projectCreateValidation';
import { newsEditValidation } from '../validation/newsEditValidation';
import { AudioPreview } from '../types';
import { soundtracksAddValidation } from '../validation/soundtracksAddValidation';

export interface ValidationResult {
    errors: string[];
    data: FormEntity;
    uploadedImages?: string[];
    uploadedFiles?: string[];
}

export interface ValidationResponse extends Response {
    validationResult: ValidationResult;
}

export interface UploadResponse extends Response {
    uploadedFiles: string[];
}

const checkValidation = (data: FormEntity, type: ValidationType): string[] => {
    switch (type) {
        case 'NEWS_CREATE':
            return newsCreateValidation(data as NewsFormEntity);
        case 'NEWS_EDIT':
            return newsEditValidation(data as NewsEditEntity);

        case 'ANIME_CREATE':
            return animeCreateValidation(data as AnimeCreateEntity);
        case 'PROJECT_CREATE':
            return projectCreateValidation(data as ProjectCreateEntity);

        case 'SOUNDTRACKS_ADD':
            return soundtracksAddValidation(data as AudioPreview[]);
    }
}

const checkImgFileType = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const filetypes = /jpeg|jpg|png|webp|gif/;
    const extnameTest = filetypes.test(extname(file.originalname).toLowerCase());
    const mimetypeTest = filetypes.test(file.mimetype);
    if (extnameTest && mimetypeTest) {
        return cb(null, true);
    }
    cb(new ValidationError('Niepoprawne dane!', ['Format plików musi być jednym z formatów grafik.']));
};

const checkFilesType = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const filetypes = /jpeg|jpg|png|webp|gif|mp3/;
    const mimetypes = /audio\/mpeg|jpeg|jpg|png|webp|gif/;
    const extnameTest = filetypes.test(extname(file.originalname).toLowerCase());
    const mimetypeTest = mimetypes.test(file.mimetype);
    if (extnameTest && mimetypeTest) {
        return cb(null, true);
    }
    cb(new ValidationError('Niepoprawne dane!', ['Format plików musi być jednym z formatów grafik.']));
};

const storage = multer.diskStorage({
    destination: './public/media',
    filename: function (req, file, cb) {
        cb(null, uuid() + extname(file.originalname));
    }
});

const imgUpload = multer({
    storage,
    limits: { fileSize: 10485760 },
    fileFilter: function (req, file, cb) {
        checkImgFileType(file, cb);
    }
}).array('img');

const filesUpload = multer({
    storage,
    limits: { fileSize: 10485760 },
    fileFilter: function (req, file, cb) {
        checkFilesType(file, cb);
    }
}).array('file');


export const imgUploadWithValidation = (type: ValidationType) => {
    return (req: Request, res: ValidationResponse, next: NextFunction) => {
        imgUpload(req, res, async (err) => {
            if (err) {
                return next(err);
            };
            const data: FormEntity = JSON.parse(req.body.data);
            const errors = checkValidation(data, type);
            if (errors.length > 0) {
                await deleteFiles(Array.from(req.files as Express.Multer.File[]).map(f => f.filename));
                res.validationResult = { errors, data, uploadedImages: [] };
            } else {
                const images = req.files as Express.Multer.File[];
                res.validationResult = {
                    errors: [],
                    data,
                    uploadedImages: images.map(i => i.filename),
                };
            }
            next();
        });
    };
};

export const imgAndAudioUploadWithValidation = (type: ValidationType) => {
    return (req: Request, res: ValidationResponse, next: NextFunction) => {
        filesUpload(req, res, async (err) => {
            if (err) {
                return next(err);
            };
            const data: FormEntity = JSON.parse(req.body.data);
            const errors = checkValidation(data, type);
            if (errors.length > 0) {
                await deleteFiles(Array.from(req.files as Express.Multer.File[]).map(f => f.filename));
                res.validationResult = { errors, data };
            } else {
                const files = req.files as Express.Multer.File[];
                res.validationResult = {
                    errors: [],
                    data,
                    uploadedFiles: files.map(i => i.filename),
                };
            }
            next();
        });
    };
};

export const fileUpload = () => {
    return (req: Request, res: UploadResponse, next: NextFunction) => {
        filesUpload(req, res, async (err) => {
            if (err) {
                return next(err);
            };
            const files = req.files as Express.Multer.File[];
            res.uploadedFiles = files.map(i => i.filename);
            next();
        });
    };
};