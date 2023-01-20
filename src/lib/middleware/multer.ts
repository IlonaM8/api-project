import multer from "multer";

export const mutlierOptions = {};

export const initMulterMiddleware = () => {
    return multer(mutlierOptions);
};

