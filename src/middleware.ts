import { NextRequest, NextResponse } from "next/server";

const authPages = ["/chat"];
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const nickname = request.cookies.get("nickname")?.value;
    if (authPages.includes(request.nextUrl.pathname)) {
        return nickname
            ? NextResponse.next()
            : NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}
