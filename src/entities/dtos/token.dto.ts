interface Payload {
    username: string,
    name: string,
    display_name: string,
    email: string,
    account_type: string,
    role: string,
    iat: number,
    exp: number,
    aud: string,
    iss: string,
    sub: string
}

export { Payload }