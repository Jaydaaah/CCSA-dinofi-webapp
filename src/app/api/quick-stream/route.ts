import { QuickStream, SendMsgStream } from "@/lib/api_calls";
import { iteratorToStream } from "@/lib/fetch_tools";
import { NextRequest, NextResponse } from "next/server";


interface reqbody {
    prompt: string;
}

export async function POST(req: NextRequest) {
    const { prompt }: reqbody = await req.json();

    if (prompt) {
        const iterator = QuickStream(prompt);
        return new Response(iteratorToStream(iterator));
    }
    return new NextResponse(null);
}
