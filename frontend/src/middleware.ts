import { NextRequest } from "next/server";
import { updateSession } from "@/lib/Auth";

export async function middleware(request: NextRequest) {
    return await updateSession(request)
}