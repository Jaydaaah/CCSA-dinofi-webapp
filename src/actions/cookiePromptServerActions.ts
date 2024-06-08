"use server";

import { cookies } from "next/headers";

export async function setCookiePromptServerAction(chat_id: string, prompt: string) {
    const cookie_key = `prompt-${chat_id}`;
    const cookie = cookies();
    cookie.set(cookie_key, prompt);
    return cookie_key;
}

export async function popCookiePromptServerAction(chat_id: string) {
    const cookie_key = `prompt-${chat_id}`;
    const cookie = cookies();
    const cookie_prompt = cookies().get(cookie_key)?.value;
    if (cookie_prompt) {
        cookie.delete(cookie_key);
    }
    return cookie_prompt;
}