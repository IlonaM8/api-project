import multer from "multer";

const storage = multer.diskStorage({
    destination: "uploads/"
})

export const mutlierOptions = {};

export const initMulterMiddleware = () => {
    return multer({storage, ...mutlierOptions});
};

