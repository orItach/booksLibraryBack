import {StatusCodes} from 'http-status-codes'

export enum LibraryError{
    badRequest,
    DbError
}

export const LibraryErrorToHttpError = new Map<LibraryError, number>([
    [LibraryError.DbError, StatusCodes.INTERNAL_SERVER_ERROR],
    [LibraryError.badRequest, StatusCodes.BAD_REQUEST]
]);

