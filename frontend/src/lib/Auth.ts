"use server"

import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

type LoginCustomerDTO = {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  status: string
  isSubscribedForPromotions: boolean
}

const secretKey = "swe4050"
const key = new TextEncoder().encode(secretKey)

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"]
  })
  return payload
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 hour from now")
    .sign(key)
}

export async function initialSetUp(user: LoginCustomerDTO) {
  const expiration = new Date(Date.now() + (60 * 60 * 1000)) // 30 minutes cookies
  const session = await encrypt({ user, expiration })
  cookies().set("session", session, { expires: expiration, httpOnly: true, sameSite : "lax"})
}

export async function hasCookie() {
  const val = cookies().get("session")?.value
  return !!val
}
export async function destroyCookie() {
  cookies().set("session", "", { expires: new Date(0), sameSite : "lax"})
}

export async function getUser() {
  const data = cookies().get("session")?.value
  if (data) return await decrypt(data)
  else return
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value
  if (session) {
    const sessionData = await decrypt(session)
    const res = NextResponse.next()
    res.cookies.set({
      name: "session",
      value: await encrypt(sessionData),
      httpOnly: true,
      expires: new Date(Date.now() + (60 * 60 * 1000)) ,
      sameSite: "lax"
    })
    return res
  } else return
}
