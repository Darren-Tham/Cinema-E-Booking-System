import { useState, useEffect } from "react"
import { getUser, hasCookie } from "./Auth"

export function useAuth(arg: String) {
    if (arg == "admin") {
        const [isAdmin, setIsAdmin] = useState(false)

        useEffect(() => {
            async function checkAdmin() {
                const user = await getUser()
                if (user.user)
                    setIsAdmin(user.user.email == "admin")
            }
            checkAdmin()
        }, [])

        return isAdmin
    }
    else if (arg == "user") {
        const [isUser, setIsUser] = useState(false)
        useEffect(() => {
            async function checkUser() {
                const cookie = await hasCookie()
                setIsUser(cookie)
            }
            checkUser()
        }, [])
        return isUser
    }

}