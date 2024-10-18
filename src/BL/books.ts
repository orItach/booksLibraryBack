import * as booksQueries from '../DAL/booksQueries'
import { Book } from '../types/book'
import { LibraryError } from '../types/libraryError'
import { LibraryResult } from '../types/libraryResult'

export const addBook = async (bookToAdd: Book): Promise<LibraryResult> => {
    if (bookToAdd.availableToLoan > bookToAdd.amount)
        return {
            success: false,
            message:
                "Can't add book, there is more available books to loan then the current amount",
            type: LibraryError.badRequest,
        }

    if (bookToAdd.popularity > 5 || bookToAdd.popularity < 1)
        return {
            success: false,
            message: "Can't add book, the popularity is out of range",
            type: LibraryError.badRequest,
        }
    const insertResult = await booksQueries.addBook(bookToAdd)
    if (insertResult.insertedId)
        return { success: true, message: 'Successfully add book to DB' }
    return {
        success: false,
        message: 'Failed to add book to DB',
        type: LibraryError.DbError,
    }
}

export const getBooks = () => booksQueries.getBooks()

export const updateBook = async (
    bookToUpdate: Book
): Promise<LibraryResult> => {
    if (bookToUpdate.availableToLoan > bookToUpdate.amount)
        return {
            success: false,
            message:
                "Can't add book there is more available books to loan then the current amount",
            type: LibraryError.badRequest,
        }

    const updateResult = await booksQueries.updateBook(bookToUpdate)
    if (updateResult.modifiedCount > 0)
        return { success: true, message: 'Successfully update book' }

    return {
        success: false,
        message: 'Failed to update book',
        type: LibraryError.DbError,
    }
}

export const searchBooks = (author: string, topic: string, year: number) =>
    booksQueries.searchBooks(author, topic, year)

export const deleteBook = async (
    bookToDelete: Book
): Promise<LibraryResult> => {
    if (bookToDelete.availableToLoan !== bookToDelete.amount)
        return {
            success: false,
            message: "Can't delete book, there is instances loaned by users",
            type: LibraryError.badRequest,
        }

    const deleteResult = await booksQueries.deleteBook(bookToDelete)
    if (deleteResult.deletedCount > 0)
        return { success: true, message: 'Successfully add book to DB ' }

    return {
        success: false,
        message: 'Failed to add book to DB',
        type: LibraryError.DbError,
    }
}
