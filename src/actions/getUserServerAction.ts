"use server";

import { Register } from "@/lib/api_calls";
import { cookies } from "next/headers";

export default async function getUserServerAction() {
    const nickname = cookies().get("nickname")?.value;
    if (!nickname) {
        throw new Error("Error: no nickname provided");
    }

    const user_data = await Register(nickname);

    if (!user_data) {
        throw new Error(`Error while Retreiving Data. Nickname: ${nickname}`);
    }

    return user_data;
}