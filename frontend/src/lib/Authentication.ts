"use server"

import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { Customer, Transaction } from "./Types"

const SECRET_KEY = "swe4050"
const KEY = new TextEncoder().encode(SECRET_KEY)
const ONE_HOUR = 60 * 60 * 1000
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000
const CUSTOMER_COOKIE_NAME = "customer"
const TRANSACTION_COOKIE_NAME = "transaction"

async function encrypt(payload: any, remember: boolean) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(remember ? "30 days from now" : "1 hour from now")
    .sign(KEY)
}

async function decrypt(session: string) {
  return (await jwtVerify(session, KEY, { algorithms: ["HS256"] })).payload
}

async function destoryCookies(cookieName: string) {
  cookies().set(cookieName, "", {
    expires: new Date(0),
    sameSite: "lax"
  })
}

function setCookies(cookieName: string, session: string, expiration: Date) {
  cookies().set(cookieName, session, {
    expires: expiration,
    httpOnly: true,
    sameSite: "lax"
  })
}

export async function createCustomer(customer: Customer, remember: boolean) {
  const expiration = new Date(Date.now() + (remember ? THIRTY_DAYS : ONE_HOUR))
  const session = await encrypt(
    { [CUSTOMER_COOKIE_NAME]: customer, expiration },
    remember
  )
  setCookies(CUSTOMER_COOKIE_NAME, session, expiration)
}

export async function getCustomer() {
  const session = cookies().get(CUSTOMER_COOKIE_NAME)?.value
  return session === undefined
    ? undefined
    : ((await decrypt(session))[CUSTOMER_COOKIE_NAME] as Customer)
}

export async function isCustomer() {
  return (await getCustomer()) !== undefined
}

export async function destroyCustomer() {
  destoryCookies(CUSTOMER_COOKIE_NAME)
}

export async function createAdmin(remember: boolean) {
  const admin: Customer = {
    id: 1,
    firstName: "",
    lastName: "",
    email: "admin",
    phoneNumber: "",
    status: "",
    isSubscribedForPromotions: false
  } as const
  createCustomer(admin, remember)
}

export async function isAdmin() {
  return (await getCustomer())?.email === "admin"
}

export async function createTransaction(transaction: Transaction) {
  const expiration = new Date(Date.now() + ONE_HOUR)
  const session = await encrypt(
    { [TRANSACTION_COOKIE_NAME]: transaction, expiration },
    false
  )
  setCookies(TRANSACTION_COOKIE_NAME, session, expiration)
}

export async function getTransaction() {
  const session = cookies().get(TRANSACTION_COOKIE_NAME)?.value
  return session === undefined
    ? undefined
    : ((await decrypt(session))[TRANSACTION_COOKIE_NAME] as Transaction)
}

export async function updateTransaction(newInfo: Transaction) {
  const session = cookies().get(TRANSACTION_COOKIE_NAME)?.value
  if (session === undefined) return

  const sessionData = await decrypt(session)
  const oldInfo = sessionData[TRANSACTION_COOKIE_NAME] as Transaction
  const updatedInfo: Transaction = {
    ...oldInfo,
    ...newInfo
  }
  const updatedData = {
    ...sessionData,
    [TRANSACTION_COOKIE_NAME]: updatedInfo
  }
  cookies().set({
    name: TRANSACTION_COOKIE_NAME,
    value: await encrypt(updatedData, false),
    expires: new Date(Date.now() + ONE_HOUR),
    httpOnly: true,
    sameSite: "lax"
  })
}

export async function destoryTransaction() {
  destoryCookies(TRANSACTION_COOKIE_NAME)
}
