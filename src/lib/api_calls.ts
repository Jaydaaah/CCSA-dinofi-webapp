"use server";
import { Message } from "@/contexts/Messages";
import { ServerLink } from "./express_serverinfo";

const BASE_URL = "http://localhost";
const SERVER_PORT = 8080;
const link = `${BASE_URL}:${SERVER_PORT}`;

const Register = async (nickname: string, prefix: string) => {
    const response = await fetch(ServerLink("/register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nickname: nickname,
            prefix: prefix,
        }),
    });
    if (response.ok) {
        const { user_id } = await response.json();
        return user_id;
    }
    return null;
};

interface loggedResponse {
    isloggedin: boolean;
}

const CheckLogin = async (user_id: string) => {
    const response = await fetch(ServerLink("/logged", { user_id }), {
        method: "GET",
    });
    const { isloggedin }: loggedResponse = await response.json();
    return isloggedin;
};

async function* SendMsgStream(user_id: string, prompt: string) {
    const response = await fetch(ServerLink("/chat", { user_id }), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            prompt,
        }),
    });
    if (response.ok) {
        response.text;
        const reader = response.body
            ?.pipeThrough(new TextDecoderStream())
            ?.getReader();
        while (reader) {
            const { done, value } = await reader.read();
            if (done) break;
            if (value) {
                const chunk = Buffer.from(value).toString("utf8");
                yield chunk;
            }
        }
    }
}

interface ChatData {
    nickname: string;
    prefix: string;
    data: Message[];
}

const RetrieveMsg = async (user_id: string) => {
    const response = await fetch(ServerLink("/chat", { user_id }), {
        next: { tags: ["conversation"] },
    });

    if (response.ok) {
        const { data }: ChatData = await response.json();
        return data;
    }
    return null;
};

export { CheckLogin, Register, SendMsgStream, RetrieveMsg };
