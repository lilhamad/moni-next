export interface paymentDto {
    userId: string,
    sign: string,
    amount : number
}
export interface responseDto {
    status: boolean,
    message?: string,
    data? : any
}
export interface walletDto {
    balance?: Number
}
export interface fundDto extends paymentDto {
    email: string,
    firstName?: string,
    lastName?: string,
    Wallet? : walletDto
}
export interface transerDto extends paymentDto {
    recipientId: string,
    senderId: string,
    Wallet? : walletDto
}

