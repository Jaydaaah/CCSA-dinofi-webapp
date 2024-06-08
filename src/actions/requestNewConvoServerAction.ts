"use server";
import { RequestNewConversation } from "@/lib/api_calls";
import { cookies } from "next/headers";

export async function requestNewConvoServerAction() {
    const nickname = cookies().get("nickname")?.value;

    if (nickname && nickname) {
        const response = await RequestNewConversation(nickname);
        if (response?.chat_id) {
            return response.chat_id;
        }
    }
    return null;
}