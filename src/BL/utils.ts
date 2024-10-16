
export const isTheSameBook= (a:Book, b:Book)=> a.author === b.author && a.topic === b.topic && a.year === b.year

export const isUserCustomer = (user:User)=> user.type === UserType.Customer
export const isUserEmployee = (user?:User)=> user?.type === UserType.Employee