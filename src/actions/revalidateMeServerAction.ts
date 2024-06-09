"use server";

import { revalidatePath } from "next/cache";

export async function revalidateMe(pathname: string) {
    revalidatePath(pathname);
}