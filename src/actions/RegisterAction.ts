"use server";

import { Register } from "@/lib/api_calls";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const RegisterFromFormHandler = async (formData: FormData) => {
    const nickname = formData.get("nicknamefield")?.toString().trim();
    const prefix = formData.get("prefixfield");

    if (nickname && prefix) {
        try {
            const user_id = await Register(
                nickname as string,
                prefix as string
            );
            cookies().set("user_id", user_id);
        } catch (err) {
            console.log(err);
        }
        revalidatePath("/login");
        redirect("/");
    }
};

export { RegisterFromFormHandler };
