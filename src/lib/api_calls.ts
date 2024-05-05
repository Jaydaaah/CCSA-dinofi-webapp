import { Message } from "@/contexts/Messages";
import axios from "axios";

const BASE_URL = "http://localhost";
const SERVER_PORT = 8080;
const link = `${BASE_URL}:${SERVER_PORT}`;

const Register = async (nickname: string, prefix: string) => {
    const response = await fetch(link + "/register", {
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
    const response = await fetch(
        link + "/logged?" + new URLSearchParams({ user_id }),
        {
            method: "GET",
        }
    );
    const { isloggedin }: loggedResponse = await response.json();
    return isloggedin;
};

interface SendMsgResponse {
    text: string;
    isright: boolean;
    timestamp: number;
}
const SendMsg = async (user_id: string, prompt: string) => {
    const response = await fetch(
        link +
            "/chat?" +
            new URLSearchParams({
                user_id,
            }),
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt,
            }),
        }
    );
    if (response.ok) {
        const { text, isright, timestamp }: SendMsgResponse =
            await response.json();

        return {
            text,
            isright,
            timestamp,
        };
    }
    return null;
};

interface ChatData {
    nickname: string;
    prefix: string;
    data: Message[];
}

const RetrieveMsg = async (user_id: string) => {
    const response = await fetch(
        link + "/chat?" + new URLSearchParams({ user_id }),
        {
            method: "GET",
        }
    );

    if (response.ok) {
        const { data }: ChatData = await response.json();
        return data;
    }
    return null;
};

export { CheckLogin, Register, SendMsg, RetrieveMsg };
