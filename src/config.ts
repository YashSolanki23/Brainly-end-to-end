import bcrypt from "bcrypt"
const Salt=12;
export const JWT_password="!123!456"


export async function HashPassword(password:string)
{
    const hashed=await bcrypt.hash(password,Salt);

    return hashed;
}

export async function VerifyPassword(password:string,hash:string)
{
    const verify=await bcrypt.compare(password,hash)

    return verify;
}

