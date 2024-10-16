import * as usersQueries from "../DAL/usersQueries"

export const getUser = (id:string)=>usersQueries.getUser(id)