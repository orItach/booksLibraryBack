import { LibraryError } from "./libraryError";

export interface LibraryResult {
    success:boolean,
    message:string,
    type?: LibraryError
}