"use server";

import { SendMsg } from "@/lib/api_calls";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const SendPromptFromFormHandler = async (formdata: FormData) => {
    const prompt = formdata.get("prompt")?.toString().trim();
    const user_id = cookies().get("user_id")?.value;
    if (user_id && prompt) {
        try {
            return SendMsg(user_id, prompt);
        } finally {
            revalidatePath("/chat-now");
        }
    }
    return null;
};

export { SendPromptFromFormHandler };
