import { NextRequest } from "next/server";
import { updateSession } from "@/lib/Auth";

export async function middleware(request: NextRequest) {
    console.log("request received")
    return await updateSession(request)
}