"use server";

"no use";

import { SendMsgStream } from "@/lib/api_calls";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const SendPromptFromFormHandler = async (formdata: FormData) => {
    const prompt = formdata.get("prompt")?.toString().trim();
    const user_id = cookies().get("user_id")?.value;
    if (user_id && prompt) {
        try {
            return { prompt, MsgStream: SendMsgStream(user_id, prompt) };
        } finally {
            revalidateTag("conversation");
        }
    }
    return { prompt, MsgStream: null };
};

export { SendPromptFromFormHandler };
