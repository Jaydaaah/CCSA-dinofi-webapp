import { SendMsgStream } from "@/lib/api_calls";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

function iteratorToStream(iterator: any) {
    return new ReadableStream({
        async pull(controller) {
            const { value, done } = await iterator.next();

            if (done) {
                controller.close();
            } else {
                controller.enqueue(value);
            }
        },
    });
}

interface reqbody {
    prompt: string;
}

export async function POST(req: NextRequest) {
    const { prompt }: reqbody = await req.json();
    const user_id = req.cookies.get("user_id")?.value;

    if (user_id && prompt) {
        const iterator = SendMsgStream(user_id, prompt);
        try {
            return new Response(iteratorToStream(iterator));
        } finally {
            revalidatePath("/chat-now");
        }
    }
    return new NextResponse(new ReadableStream());
}
