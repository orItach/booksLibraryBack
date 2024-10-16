const books: Book[]=[]

export const addBook= (bookToAdd:Book)=>{
    books.push(bookToAdd)
}

export const getBooks = ()=>{
    return books
}

export const updateBook = (bookToUpdate:Book)=>{
    const bookToChange = books.find(b=>b.name=== bookToUpdate.name)
    // bookToChange = {...bookToUpdate}
}

export const searchBooks = (author:string, topic:string, year:number)=>{
    const bookToChange = books.filter(b=>b.author=== author && b.topic=== topic && b.year===year)
    return bookToChange
}