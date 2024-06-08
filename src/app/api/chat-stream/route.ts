import { SendMsgStream } from "@/lib/api_calls";
import { iteratorToStream } from "@/lib/fetch_tools";   
import { NextRequest, NextResponse } from "next/server";

interface reqbody {
    chat_id: string
    prompt: string;
}

export async function POST(req: NextRequest) {
    const { chat_id, prompt }: reqbody = await req.json();

    if (chat_id && prompt && prompt != "") {
        const iterator = SendMsgStream(chat_id, prompt);
        return new Response(iteratorToStream(iterator));
    }
    return new NextResponse(new ReadableStream());
}
