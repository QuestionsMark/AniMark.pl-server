import { extname } from 'path';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import { ValidationError } from './error';
import { FormEntity, NewsFormEntity, ValidationType } from '../types/formEntities';
import { deleteImages } from '../utils/deleteImages';
import { newsCreateValidation } from '../validation/newsCreateValidation';

export interface ValidationResult {
    errors: string[];
    data: FormEntity;
    uploaded: string[];
}

export interface ValidationResponse extends Response {
    validationResult: ValidationResult;
}

const checkValidation = (data: FormEntity, type: ValidationType): string[] => {
    switch (type) {
        case 'NEWS_CREATE':
            return newsCreateValidation(data as NewsFormEntity);
    }
}

const checkFileType = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const filetypes = /jpeg|jpg|png|webp|gif/;
    const extnameTest = filetypes.test(extname(file.originalname).toLowerCase());
    const mimetypeTest = filetypes.test(file.mimetype);
    if (extnameTest && mimetypeTest) {
        return cb(null, true);
    }
    cb(new ValidationError('Niepoprawne dane!', ['Format plików musi być jednym z formatów grafik.']));
};

const storage = multer.diskStorage({
    destination: './public/image',
    filename: function (req, file, cb) {
        cb(null, uuid());
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10485760 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).array('img');


export const imgUploadWithValidation = (type: ValidationType) => {
    return (req: Request, res: ValidationResponse, next: NextFunction) => {
        upload(req, res, async (err) => {
            if (err) {
                return next(err);
            };
            const data: FormEntity = JSON.parse(req.body.data);
            const errors = checkValidation(data, type);
            if (errors.length > 0) {
                await deleteImages(Array.from(req.files as Express.Multer.File[]).map(f => f.filename));
                res.validationResult = { errors, data, uploaded: [] };
            } else {
                const images = req.files as Express.Multer.File[];
                res.validationResult = {
                    errors: [],
                    data,
                    uploaded: images.map(i => i.filename),
                };
            }
            next();
        });
    }
};