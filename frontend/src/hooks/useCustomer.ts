"use client"

import { useEffect, useState } from "react"
import { isCustomer as isCustomerAuthentication } from "@/lib/Authentication"
import { useRouter } from "next/navigation"

const useCustomer = () => {
  const router = useRouter()
  const [isCustomer, setIsCustomer] = useState(false)

  useEffect(() => {
    const fetchIsCustomer = async () => {
      const isCustomer = await isCustomerAuthentication()
      if (isCustomer) {
        setIsCustomer(true)
      } else {
        router.push("/login/login-page")
      }
    }
    fetchIsCustomer()
  }, [])

  return isCustomer
}

export default useCustomer
