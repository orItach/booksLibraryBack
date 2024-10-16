const users: User[]=[]

export const getUser = (id:string)=>users.find(u => u.idNumber === id)