"use client"

import { useEffect, useState } from "react"
import { isAdmin as isAdminAuthentication } from "@/lib/Authentication"
import { useRouter } from "next/navigation"

const useAdmin = () => {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const fetchIsAdmin = async () => {
      const isAdmin = await isAdminAuthentication()
      if (isAdmin) {
        setIsAdmin(true)
      } else {
        router.push("/login/login-page")
      }
    }
    fetchIsAdmin()
  }, [])

  return isAdmin
}

export default useAdmin
