import { CheckLogin } from "@/lib/api_calls";
import { NextRequest, NextResponse } from "next/server";

const authPages = ["/chat-now"];
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // authentication
    const user_id = request.cookies.get("user_id")?.value;
    if (authPages.includes(request.nextUrl.pathname)) {
        return user_id && (await CheckLogin(user_id))
            ? NextResponse.next()
            : NextResponse.redirect(new URL("/login", request.url));
    } else if (request.nextUrl.pathname.match("/login")) {
        return !(user_id && (await CheckLogin(user_id)))
            ? NextResponse.next()
            : NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}
