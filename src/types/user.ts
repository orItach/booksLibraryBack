interface User {
    idNumber:string,
    firstName:string,
    lastName:string,
    type:string,// chagne to enum
    loanBooks:[Book]
}