"use server";

import { cookies } from "next/headers";

export default async function setNicknameServerAction(nickname: string) {
    cookies().set("nickname", nickname.trim());
}