"use server";
import { RequestNewConversation } from "@/lib/api_calls";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function requestNewConvoServerAction() {
    const nickname = cookies().get("nickname")?.value;

    if (nickname && nickname) {
        const response = await RequestNewConversation(nickname);
        if (response?.chat_id) {
            revalidatePath("/chat");
            return response.chat_id;
        }
    }
    return null;
}