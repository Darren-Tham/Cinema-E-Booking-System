import { Dispatch, SetStateAction } from "react"

type Email = {
  receiverEmail: string
  verificationCode: string
}

export async function sendAndSetNewVerificationCode(
  customerId: number,
  setVerificationCode: Dispatch<SetStateAction<string>>
) {
  const code = generateVerificationCode()
  sendEmail(code, customerId)
  setVerificationCode(code)
}

export async function resendVerificationCode(
  customerId: number,
  setVerificationCode: Dispatch<SetStateAction<string>>
) {
  await sendAndSetNewVerificationCode(customerId, setVerificationCode)
  alert(
    "A new verification code has been sent to your associated email account. The previous verification code is now expired. Please enter the new verification code."
  )
}

async function sendEmail(code: string, customerId: number) {
  const email: Email = {
    receiverEmail: await getEmail(customerId),
    verificationCode: code
  } as const
  await fetch("http://localhost:8080/api/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(email)
  })
}

async function getEmail(customerId: number) {
  const response = await fetch(
    `http://localhost:8080/api/customer/email/${customerId}`
  )
  return await response.text()
}

function generateVerificationCode() {
  const randomNumber = Math.floor(Math.random() * 1_000_000)
  let verificationCode = randomNumber.toString()
  while (verificationCode.length < 6) {
    verificationCode = "0" + verificationCode
  }
  return verificationCode
}
