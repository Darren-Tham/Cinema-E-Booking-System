import { SignJWT, jwtVerify} from "jose"
import {cookies} from "next/headers"
import {NextRequest, NextResponse} from "next/server"

const secretKey = "swe4050"
const key = new TextEncoder().encode(secretKey)



export async function encrypt (payload: any) {
    return await new SignJWT(payload).setProtectedHeader({alg: "HS256"}).setIssuedAt().setExpirationTime("15 sec from now").sign(key)
}

export async function initialSetUp(data: any) {
    const user = {id: data.customerId, email : data.email}
    const expiration = new Date(Date.now() + 15*1000) // 15 sec expiration
    const session = await encrypt({user, expiration})
    cookies().set("session", session, {expires: expiration, httpOnly: true})
}