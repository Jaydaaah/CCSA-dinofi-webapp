import { NextApiRequest, NextApiResponse } from "next";

import { Message } from "@/contexts/Messages";

export async function GET() {
    const new_msgs: Message[] = [
        {
            text: "Hello World",
            isright: false,
            timestamp: 1000,
        },
    ];
    return Response.json({
        data: new_msgs,
    });
}
