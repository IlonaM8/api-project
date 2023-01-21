import { RequestHandler } from "express";
import { checkAuthorizazion } from "./passport";

jest.mock("./passport", () => {
    const originalModule = jest.requireActual("./passport");

    const checkAuthorizazion: RequestHandler = (
        request,
        response,
        next
    ) => {
        next();
    }

    return {
        __esModule: true,
        ...originalModule,
        checkAuthorizazion,
    }
})
