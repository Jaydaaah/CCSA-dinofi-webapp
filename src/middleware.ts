import { NextRequest, NextResponse } from "next/server";

const authPage = "/chat";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const nickname = request.cookies.get("nickname")?.value;
    if (request.nextUrl.pathname.startsWith(authPage)) {
        return nickname
            ? NextResponse.next()
            : NextResponse.redirect(new URL("/", request.url));
    } else if (request.nextUrl.pathname =="/") {
        return nickname
            ? NextResponse.redirect(new URL("/chat", request.url))
            : NextResponse.next();
    }
    return NextResponse.next();
}
