"use server";

import { Message } from "@/hooks/Message/Message";
import { revalidateTag } from "next/cache";

const baseURL = "http://localhost:8080/";

const ServerLink = (path: string) => {
    if (URL.canParse(path, baseURL)) {
        return new URL(path, baseURL);
    }
    return "";
};

function fetchBaseWrapper<type>(
    path: string,
    ok_response_fn: (res: Response) => Promise<type>,
    init?: RequestInit
) {
    return async function () {
        try {
            const link = ServerLink(path);
            if (link) {
                const response = await fetch(link, init);
                if (response.ok) {
                    return ok_response_fn(response);
                } else {
                    console.log(
                        `${
                            response.status
                        } fetch response from ${path} msg: ${await response.text()}`
                    );
                }
            }
            return null;
        } catch (error) {
            console.error(`fetch (${path}): Encounter an Error: ${error}`);
            return null;
        }
    };
}

function fetchWrapper<type>(path: string, init?: RequestInit) {
    return fetchBaseWrapper<type>(
        path,
        async (res) => {
            const resp_json: type = await res.json();
            return resp_json;
        },
        init
    );
}

function fetchWrapperStreamable(path: string, init?: RequestInit) {
    return fetchBaseWrapper<ReadableStream<Uint8Array> | null>(
        path,
        async (res) => {
            return res.body;
        },
        init
    );
}

function fetchStatusWrapper(path: string, init?: RequestInit) {
    return fetchBaseWrapper<boolean>(
        path,
        async (res) => {
            return true;
        },
        init
    );
}

function TemplateRequestInit(
    method: "POST" | "PUT" | "DELETE",
    body?: BodyInit | Record<string, any> | null,
    cache?: RequestCache,
    contentType: string = "application/json"
): RequestInit {
    return {
        headers: {
            "Content-Type": contentType,
        },
        method,
        body: JSON.stringify(body),
        cache: cache,
    };
}

interface RegisterResponse {
    _id: string;
    nickname: string;
    chat_ids: {
        title: string;
        chat_id: string;
    }[];
}

export async function Register(nickname: string) {
    const fetchW = fetchWrapper<RegisterResponse>(
        "/reg?" + new URLSearchParams({ nickname })
    );
    return await fetchW();
}

export async function* SendMsgStream(chat_id: string, prompt: string) {
    const fetchWS = fetchWrapperStreamable(
        "/chat?" + new URLSearchParams({ chat_id }),
        TemplateRequestInit("POST", { prompt }, "no-store")
    );
    const body = await fetchWS();
    const reader = body?.pipeThrough(new TextDecoderStream())?.getReader();
    while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
            const chunk = Buffer.from(value).toString("utf8");
            yield chunk;
        }
    }
    revalidateTag("chats");
}

export async function* QuickStream(prompt: string) {
    const fetcSW = fetchWrapperStreamable(
        "/quick",
        TemplateRequestInit("PUT", { prompt }, "no-store")
    );
    const body = await fetcSW();
    if (!body) return;
    const reader = body.pipeThrough(new TextDecoderStream()).getReader();
    while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
            const chunk = Buffer.from(value).toString("utf8");
            yield chunk;
        }
    }
}

interface ChatData {
    _id: string;
    nickname: string;
    data: Message[];
}

export async function RetrieveMsg(chat_id: string) {
    const fetchW = fetchWrapper<ChatData>(
        "/chat?" + new URLSearchParams({ chat_id }),
        { cache: "no-store" }
    );
    return await fetchW();
}

interface RequestNewConversationResponse {
    chat_id: string;
}

export async function RequestNewConversation(nickname: string) {
    const fetchW = fetchWrapper<RequestNewConversationResponse>(
        "/reg?" + new URLSearchParams({ nickname }),
        { method: "POST" }
    );
    return await fetchW();
}
