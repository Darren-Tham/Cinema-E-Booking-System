"use server"

import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

// some code are adapted from next.js documentation

export type Customer = {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  status: string
  isSubscribedForPromotions: boolean
}
let remember = false
const secretKey = "swe4050"
const key = new TextEncoder().encode(secretKey)

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"]
  })
  return payload
}

export async function encrypt(payload: any, persist: boolean) {
  remember = persist
  if (!remember) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1 hour from now")
      .sign(key)
  } else {
    console.log("new")
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30 days from now")
      .sign(key)
  }
}
async function setPersist(persist: boolean) {
  remember = persist
}

export async function initialSetUp(user: Customer, persist: boolean) {
  remember = persist
  let expiration = new Date(Date.now())
  if (!persist) {
    expiration = new Date(Date.now() + 60 * 60 * 1000) // 1-hour cookies
  } else {
    expiration = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30-day cookies
  }

  const session = await encrypt({ user, expiration }, persist)
  cookies().set("session", session, {
    expires: expiration,
    httpOnly: true,
    sameSite: "lax"
  })
  await setPersist(persist)
}

export async function hasCookie() {
  const val = cookies().get("session")?.value
  return !!val
}
export async function destroyCookie() {
  remember = false
  cookies().set("session", "", { expires: new Date(0), sameSite: "lax" })
}
export async function updateUser(user: Customer) {
  const val = cookies().get("session")?.value
  if (val) {
    initialSetUp(user, remember)
  }
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
    if (!(sessionData.exp - sessionData.iat == 2592000)) {
      res.cookies.set({
        name: "session",
        value: await encrypt(sessionData, remember),
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 1000),
        sameSite: "lax"
      })
    }
    return res
  } else return
}
